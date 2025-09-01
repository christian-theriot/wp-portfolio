import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, RichText, InspectorControls, store } from '@wordpress/block-editor';
import { Button, PanelBody, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data'
import './editor.scss';
import { useState } from 'react';

export default function Edit({ attributes, setAttributes, clientId }) {

    const MAX_NUM_CARDS = 6;
    const innerBlocks = useSelect(select => select(store).getBlock(clientId).innerBlocks);

    return <>
        <InspectorControls>
            <PanelBody title={__('Settings', 'carousel')}>
                <NumberControl
                    label="Number of Cards"
                    help="Control the maximum number of cards displayed in the carousel"
                    min={1}
                    max={MAX_NUM_CARDS}
                    value={attributes._settings_num_cards}
                    onChange={value => setAttributes({ _settings_num_cards: parseInt(value) })}
                />
            </PanelBody>
        </InspectorControls>
        <div {...useBlockProps()}>
            <RichText
                tagName='h3'
                value={attributes.body}
                allowedFormats={['core/bold', 'core/italic']}
                onChange={content => setAttributes({ body: content })}
                placeholder={__('Carousel Content')}
            />
            <div className={"slider"}>
                <InnerBlocks orientation='horizontal' />
            </div>
        </div>
    </>
}