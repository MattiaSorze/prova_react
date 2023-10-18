import React, { useState } from 'react';
import "./hikingCardMenu.css";
import { Typography } from '@mui/joy';
import ModalDialog from '../../../utility/modalDialog';
import HikingDetailsPanel from './hikingDetailsPanel';
import { selectHikingDetail, closeComplHikingDetailDialog } from '../../../features/completedHikings/completedHikingsSlice';
import { useDispatch, useSelector } from 'react-redux';

const HikingCardMenu = ({hikingElem, closePopover}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const complHikingDetailOpen = useSelector(state => state.complHikings.openCompHikingDetail);
  const selectedHikingDetail = useSelector(state => state.complHikings.selectedHikingDetail);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();

  const handleSelectValue = (value) => {
    setSelectedValue(value);
    //onSelect(value);
    setIsOpen(false);
    closePopover();
  };

    const openComplHikingDetail = () => {
        dispatch(selectHikingDetail(hikingElem));
    }

    const closeComplHikingDetail = () => {
        dispatch(closeComplHikingDetailDialog());
        closePopover();
    }

  return (
    <div>
        {/*<div>
          <div className="menu-option-style" onClick={() => openComplHikingDetail(hikingElem)}>
            <Typography level="h6" className="menu-option-typography">View Details</Typography>
          </div>
        </div>*/}
        <ModalDialog
            modalFunctions={null}
            open={complHikingDetailOpen}
            closeFunc={closeComplHikingDetail}
            openComplHikingDetail={openComplHikingDetail}
            hikingElem={hikingElem}
            closePopover={closePopover}
            component={
                <HikingDetailsPanel
                    fileData={selectedHikingDetail ? selectedHikingDetail.gpxData : null}/>
            }
        />
    </div>
  );
};

export default HikingCardMenu;
