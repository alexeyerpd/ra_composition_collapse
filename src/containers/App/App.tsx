import {Collapse} from 'components/Collapse/Collapse';
import {cn} from 'utils/classname';

import '../../styles/root.scss';
import './App.scss';

const block = cn('app');

export function App() {
    return (
        <div className={block()}>
            <Collapse>Какая-то информация, какой-то текст</Collapse>
        </div>
    );
}
