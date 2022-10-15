import React, { useRef, forwardRef, useState, useEffect } from 'react';
import Dropdown from 'components/Dropdown';
import { IconCaretDown, IconBox, IconSwitch3, IconSettings, IconFolders } from '@tabler/icons';
import WorkspaceConfigurer from "../WorkspaceConfigurer";
import { useDispatch, useSelector } from 'react-redux';
import { selectWorkspace } from 'providers/ReduxStore/slices/workspaces';
import StyledWrapper from './StyledWrapper';

const WorkspaceSelector = () => {
  const dropdownTippyRef = useRef();
  const [openWorkspacesModal, setOpenWorkspacesModal] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState({});
  const dispatch = useDispatch();

  const { workspaces, activeWorkspaceUid } = useSelector((state) => state.workspaces);

  useEffect(() => {
    setActiveWorkspace(workspaces.find((workspace) => workspace.uid === activeWorkspaceUid));
  }, [activeWorkspaceUid]);

  const Icon = forwardRef((props, ref) => {
    return (
      <div ref={ref} className="current-workspace flex justify-between items-center pl-2 pr-2 py-1 select-none">
        <div className='flex items-center'>
          <span className='mr-2'>
            <IconBox size={18} strokeWidth={1.5}/>
          </span>
          <span>
            {activeWorkspace ? activeWorkspace.name : ''}
          </span>
        </div>
        <IconCaretDown className="caret" size={14} strokeWidth={2}/>
      </div>
    );
  });

  const onDropdownCreate = (ref) => dropdownTippyRef.current = ref;

  const handleSelectWorkspace = (workspace) => {
    dispatch(selectWorkspace(workspace));
  }

  return (
    <StyledWrapper>
      <div className="items-center cursor-pointer relative">
        <Dropdown onCreate={onDropdownCreate} icon={<Icon />} placement='bottom-end'>
          {/* {workspaces && workspaces.length && workspaces.map((workspace) => (
            <div className="dropdown-item" onClick={() => handleSelectWorkspace(workspace)} key={workspace.uid}>
              <span>{workspace.name}</span>
            </div>
          ))} */}
          <div className="dropdown-item" onClick={() => handleSelectWorkspace(workspace)}>
            <div className="pr-2 text-gray-600">
              <IconSwitch3 size={18} strokeWidth={1.5}/>
            </div>
            <span>Switch Workspace</span>
          </div>

          <div className="dropdown-item" onClick={() => handleSelectWorkspace(workspace)}>
            <div className="pr-2 text-gray-600">
              <IconSettings size={18} strokeWidth={1.5}/>
            </div>
            <span>Configure Workspaces</span>
          </div>
        </Dropdown>
      </div>
      {openWorkspacesModal && <WorkspaceConfigurer onClose={() => setOpenWorkspacesModal(false)}/>}
    </StyledWrapper>
  );
};

export default WorkspaceSelector;