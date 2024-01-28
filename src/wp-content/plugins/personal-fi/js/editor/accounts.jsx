import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { PanelBody, TextControl, RadioControl, Button } from '@wordpress/components';

class Accounts {
    TYPE_FORMATS = [
            {label: 'Checking', value: 'checking'},
            {label: 'Credit', value: 'credit'},
            {label: 'Savings', value: 'savings'},
            {label: '401k', value: '401k'},
            {label: 'IRA', value: 'ira'},
            {label: 'Roth 401k', value: 'roth-401k'},
            {label: 'Roth IRA', value: 'roth-ira'},
            {label: 'Brokerage', value: 'brokerage'},
            {label: 'Money Market', value: 'money-market'},
            {label: 'Loan', value: 'loan'}
    ];

    constructor({attributes, setAttributes}) {
        const [accounts, setAccounts] = useState(attributes?.accounts ?? []);
        this.accounts = accounts;
        this.setAccounts = (accounts) => {
            setAccounts(accounts);
            setAttributes({
                ...attributes,
                accounts
            });
        }
    }

    type_format(type) {
        for (const TYPE_FORMAT of this.TYPE_FORMATS) {
            if (TYPE_FORMAT.value === type) {
                return TYPE_FORMAT.label;
            }
        }

        return '';
    }

    _addAccount() {
        this.setAccounts(this.accounts.concat([
            {name: '', type: ''}
        ]));
    }

    _moveAccountDown(idx) {
        if (idx >= this.accounts.length - 1) {
            this.setAccounts(
                [this.accounts[this.accounts.length - 1]].concat(this.accounts.slice(0, this.accounts.length - 1))
            )

            return;
        }

        /**
         * idx - 1
         * idx
         * idx + 1
         * 
         * becomes
         * 
         * idx - 1
         * idx + 1
         * idx
         * idx + 2
         */
        this.setAccounts(
            this.accounts.slice(0, idx)
                         .concat([this.accounts[idx+1], this.accounts[idx]])
                         .concat(this.accounts.slice(idx+2))
        );
    }

    _moveAccountUp(idx) {
        if (idx <= 0) {
            this.setAccounts(
                this.accounts.slice(1).concat(this.accounts[0])
            );

            return;
        }

        /**
         * idx - 1
         * idx
         * idx + 1
         * 
         * becomes
         * 
         * idx - 2
         * idx
         * idx - 1
         * idx + 1
         */
        this.setAccounts(
            this.accounts.slice(0, idx-1)
                         .concat([this.accounts[idx], this.accounts[idx-1]])
                         .concat(this.accounts.slice(idx+1))
        );
    }

    _updateAccount(idx, property, value) {
        console.log(this.accounts[idx][property], value);

        this.setAccounts(this.accounts.map((account, i) => {
            if (i === idx) {
                account[property] = value;
            }

            return account;
        }));
    }

    _removeAccount(idx) {
        if (0 > idx || idx >= this.accounts.length) {
            console.error('Attempted to access OOB memory: [', idx, ',', this.accounts.length, ']');
            return;
        }

        this.setAccounts(this.accounts.toSpliced(idx, 1));
    }

    edit() {
        let rows = [];

        for (let i = 0; i < this.accounts.length; i++) {
            rows.push(
                <div>
                    <PanelBody
                        title={__(this.accounts[i].name + ' ' + this.type_format(this.accounts[i].type))}
                        initialOpen={false}
                    >
                        <TextControl
                            label={__('Name')}
                            value={this.accounts[i].name}
                            onChange={value => this._updateAccount(i, 'name', value)}
                        />
                        <RadioControl
                            label={__('Type')}
                            selected={this.accounts[i].type}
                            options={this.TYPE_FORMATS}
                            onChange={value => this._updateAccount(i, 'type', value)}
                        />
                        <Button variant='secondary' onClick={() => this._moveAccountUp(i)}>Move Up</Button>
                        <Button variant='secondary' onClick={() => this._moveAccountDown(i)}>Move Down</Button>
                        <Button
                            variant='secondary'
                            onClick={() => this._removeAccount(i)}
                        >Remove</Button>
                    </PanelBody>
                </div>
            );
        }

        return <div>
            {rows}
            <Button variant='primary' onClick={() => this._addAccount()}>Add Row</Button>
        </div>
    }
}

export { Accounts };
export default { Accounts };