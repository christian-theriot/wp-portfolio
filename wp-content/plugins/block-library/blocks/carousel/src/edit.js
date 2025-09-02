import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, RichText, InspectorControls, store } from '@wordpress/block-editor';
import { PanelBody, __experimentalNumberControl as NumberControl, CheckboxControl, Icon } from '@wordpress/components';
import { chevronRight, chevronLeft } from '@wordpress/icons';
import { useSelect } from '@wordpress/data'
import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {

    const MAX_NUM_CARDS = 6;
    const innerBlocks = useSelect(select => select(store).getBlock(clientId).innerBlocks);

    return <>
        <InspectorControls>
            <PanelBody
                title={__('Settings', 'carousel')}
                initialOpen={true}
            >
                <NumberControl
                    label="Number of Cards"
                    help="Control the maximum number of cards displayed in the carousel"
                    min={1}
                    max={MAX_NUM_CARDS}
                    value={attributes._settings_num_cards}
                    onChange={value => setAttributes({ _settings_num_cards: parseInt(value) })}
                />
                <CheckboxControl
                    label="Debug"
                    help="Enable this to printout data related to this block"
                    checked={attributes._settings_debug}
                    onChange={value => setAttributes({ _settings_debug: value })}
                />
            </PanelBody>
        </InspectorControls>
        <div {...useBlockProps()}>
            <RichText
                tagName='h3'
                value={attributes.body}
                allowedFormats={['core/bold', 'core/italic']}
                onChange={content => setAttributes({ body: content })}
                placeholder={__('Carousel Content', 'carousel')}
            />
            <div className={"slider"}>
                <Icon className='carousel-prev' icon={chevronLeft} />
                <InnerBlocks orientation='horizontal' />
                <Icon className='carousel-next' icon={chevronRight} />
            </div>
        </div>
    </>
}