import { TextControl } from '@wordpress/components';

class Budget {
    /**
     * context: {
     *   rows: [
     *     {
     *       date: string, // datetime
     *       name: string,
     *       amount: number
     *     }
     *   ]
     * }
     */
    constructor({attributes, setAttributes}) {
        // propagate the setAttributes method from the editor
        this.setAttributes = setAttributes;

        if (attributes?.context?.rows?.length >= 0) {
            this.rows = attributes.context.rows;
        } else {
            // only do this if attributes is undefined (first run)
            this.rows = [];
            this.setAttributes({
                context: {
                    rows: this.rows
                }
            });
        }
    }

    /**
     * Add a new row to the context. Uses today's date,
     * corrected for your time zone by default.
     */
    _addRow() {
        let date = new Date();
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() - (offset * 60 * 1000));

        this.rows.push({
            date: date.toISOString().split('T')[0],
            name: '',
            amount: 0
        });
        this.setAttributes({
            context: {
                rows: this.rows
            }
        });
    }

    /**
     * Removes the selected row from the context
     * 
     * @param idx The index of the row to remove, 0-based
     */
    _removeRow(idx) {
        if ( 0 > idx || idx >= this.rows.length) {
            console.error('Prevented attempt to access ', idx, ' out of an array of size ', this.rows.length);
            return;
        }

        this.rows.splice(idx, 1);
        this.setAttributes({
            context: {
                rows: this.rows
            }
        });
    }

    /**
     * Update the selected row in the content
     * 
     * @param idx The index of the row to update, 0-based
     * @param property The name of the property to update
     * @param value The value to set for the property
     */
    _updateRow(idx, property, value) {
        this.rows[idx][property] = value;
        this.setAttributes({
            context: {
                rows: this.rows
            }
        });
    }

    /**
     * Render the selected row, returning the JSX representation.
     * There will be 3 controls in the row, followed by a button that will remove this row
     * 
     * @param idx The index of the row to render
     */
    _editRow(idx) {
        return <tr>
            <td>
                <TextControl
                    placeholder='Enter a date...'
                    value={this.rows[idx].date}
                    onChange={value => this._updateRow(idx, 'date', value)}
                />
            </td>
            <td>
                <TextControl
                    placeholder='Enter a name...'
                    value={this.rows[idx].name}
                    onChange={value => this._updateRow(idx, 'name', value)}
                />
            </td>
            <td>
                <TextControl
                    placeholder='Enter an amount...'
                    value={this.rows[idx].amount}
                    onChange={value => this._updateRow(idx, 'amount', isNaN(parseFloat(value)) ? value : parseFloat(value))}
                />
            </td>
            <td>
                <button onClick={() => this._removeRow(idx)}>Delete</button>
            </td>
        </tr>;
    }

    /**
     * Return the fully rendered markup of the rows context
     */
    edit() {
        // convert the rows context into an array of rendered markup
        const editRows = [];

        for (let i = 0; i < this.rows.length; i++) {
            editRows.push(this._editRow(i));
        }

        return <>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {editRows}
                    <tr>
                        <td colSpan="3">
                            <button onClick={() => this._addRow()}>Add Row</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>;
    }
}

export { Budget }
export default { Budget }