import { forwardRef } from "react";

const customDatePicker = forwardRef(({ value, onClick }, ref) => (
    <button className="custom-date-picker" onClick={onClick} ref={ref}>
        {value ? `${value}` : 'All time'}
    </button>
));

export default customDatePicker