import React from 'react';
import {useDispatch} from 'react-redux';
import {redirectToTarget} from '../store/reducers/linkRedirectSlice';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const ShortLink = ({value, rerenderTable}) => {
    const dispatch = useDispatch();

    const handleCopyToClipboard = () => {
    };

    const handleRedirect = () => {
        dispatch(redirectToTarget(value));
        rerenderTable();
    };
    const fullShortLink = `https://front-test.hex.team/s/${value}`;
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{marginRight: '8px', cursor: 'pointer'}} onClick={handleRedirect}>
                {fullShortLink}
            </span>
            <CopyToClipboard text={fullShortLink} onCopy={handleCopyToClipboard}>
                <Tooltip title="Copy link">
                    <IconButton aria-label="copy">
                        <FileCopyIcon/>
                    </IconButton>
                </Tooltip>
            </CopyToClipboard>
        </div>
    );
};
export default ShortLink;