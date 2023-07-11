import * as React from 'react';
import {cn} from 'utils/classname';
import {ChildrenProps} from 'utils/types';

import './Collapse.scss';

const block = cn('collapse');

const DURATION_ANIMATION = 1000;

interface CollapseProps extends ChildrenProps {
    collapsedLabel?: string;
    expandedLabel?: string;
}

export function Collapse({
    children,
    collapsedLabel = 'Развернуть',
    expandedLabel = 'Свернуть',
}: CollapseProps) {
    const inited = React.useRef(false);
    const [serviceOpen, setServiceOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleToggleOpen = () => {
        setServiceOpen((prev) => !prev);
    };
    React.useEffect(() => {
        let tId: NodeJS.Timeout | null = null;
        if (inited.current && !serviceOpen) {
            tId = setTimeout(() => {
                setOpen(serviceOpen);
            }, DURATION_ANIMATION);
        } else {
            setOpen(serviceOpen);
        }
        return () => {
            if (tId) {
                clearTimeout(tId);
                tId = null;
            }
        };
    }, [serviceOpen]);
    React.useEffect(() => {
        if (!inited.current) {
            inited.current = true;
        }
    }, []);
    return (
        <div className={block()}>
            <div className={block('actions')}>
                <button className={block('action-btn')} onClick={handleToggleOpen}>
                    {serviceOpen ? expandedLabel : collapsedLabel}
                </button>
            </div>
            {open && (
                <div className={block('content', {open: serviceOpen, close: inited.current && !serviceOpen})}>
                    {children}
                </div>
            )}
        </div>
    );
}
