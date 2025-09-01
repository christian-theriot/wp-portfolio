import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { useState } from 'react';
import { Button } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const [editingBody, setEditingBody] = useState(false);

    return <>
        <div {...useBlockProps()}>
            <RichText
                tagName='h3'
                value={attributes.body}
                allowedFormats={['core/bold', 'core/italic']}
                onChange={content => setAttributes({ body: content })}
                placeholder={__('Carousel Content')}
            />
            <div class="slider">
                <Button variant='secondary' className='prev-arrow' onClick={() => console.log('edit prev')}>&lt;</Button>
                <InnerBlocks />
                <Button variant='secondary' className='next-arrow' onClick={() => console.log('edit next')}>&gt;</Button>
            </div>
        </div>
    </>
}