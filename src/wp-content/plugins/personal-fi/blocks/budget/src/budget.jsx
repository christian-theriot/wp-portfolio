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
        this.setAttributes = setAttributes;

        if (attributes?.context?.rows?.length >= 0) {
            this.rows = attributes.context.rows;
        } else {
            this.rows = [];
            this.setAttributes({
                context: {
                    rows: this.rows
                }
            });
        }
    }

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

    _removeRow(idx) {
        if ( 0 > idx || idx >= this.rows.length) {
            console.error('Prevented attempt to access ', idx, ' out of an ', this.rows.length, ' array');
            return;
        }

        this.rows.splice(idx, 1);
        this.setAttributes({
            context: {
                rows: this.rows
            }
        });
    }

    _updateRow(idx, property, value) {
        this.rows[idx][property] = value;
        this.setAttributes({
            context: {
                rows: this.rows
            }
        });
    }

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

    edit() {
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