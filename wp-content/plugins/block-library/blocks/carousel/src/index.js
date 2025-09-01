import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType(metadata.name, {
    edit: Edit,
    save: () => <InnerBlocks.Content />
});