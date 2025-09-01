import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, store, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Card, CardHeader, CardBody, __experimentalText as Text, __experimentalHeading as Heading, PanelBody, Button, ResponsiveWrapper } from '@wordpress/components';
import { withSelect } from '@wordpress/data'
import './editor.scss';

function _Edit({ attributes, setAttributes, media }) {

    const onSelectMedia = media => {
        setAttributes({
            media: {
                id: media.id,
                url: media.url
            }
        });
    }

    const removeMedia = () => {
        setAttributes({
            media: {
                id: 0,
                url: ''
            }
        });
    }

    return <>
        <div {...useBlockProps()}>
            <InspectorControls>
                <PanelBody
                    title={__('Select foreground image', 'carousel-card')}
                    initialOpen={true}
                >
                    <div className="editor-carousel-card-featured-image">
                        <MediaUploadCheck>
                            <MediaUpload
                                allowedTypes={['image']}
                                render={({ open }) =>
                                    <Button
                                        className={attributes.media.id == 0 ? 'editor-carousel-card-featured-image__toggle' : 'editor-carousel-card-featured-image__preview'}
                                        onClick={open}
                                    >
                                        {attributes.media.id == 0 && __('Choose an image', 'carousel-card')}
                                        {media !== undefined &&
                                            <ResponsiveWrapper
                                                naturalWidth={media.media_details.width}
                                                naturalHeight={media.media_details.height}
                                            >
                                                <img src={media.source_url} />
                                            </ResponsiveWrapper>}
                                    </Button>}
                                onSelect={onSelectMedia}
                                value={attributes.media.id}
                            />
                        </MediaUploadCheck>
                        {
                            attributes.media.id != 0 &&
                            <MediaUploadCheck>
                                <MediaUpload
                                    title={__('Replace image', 'carousel-card')}
                                    value={attributes.media.id}
                                    onSelect={onSelectMedia}
                                    allowedTypes={['image']}
                                    render={({ open }) =>
                                        <Button
                                            onClick={open}
                                            isLarge
                                            variant='secondary'
                                        >
                                            {__('Replace image', 'carousel-card')}
                                        </Button>
                                    }
                                />
                            </MediaUploadCheck>
                        }
                        {
                            attributes.media.id != 0 &&
                            <MediaUploadCheck>
                                <Button onClick={removeMedia} isLink isDestructive>
                                    {__('Remove image', 'carousel-card')}
                                </Button>
                            </MediaUploadCheck>
                        }
                    </div>
                </PanelBody>
            </InspectorControls>
            <Card>
                <CardHeader>
                    {
                        attributes.media.id != 0 &&
                        <div class="carousel-card__preview">
                            <img src={attributes.media.url} />
                        </div>
                    }
                    <Heading level={4}>
                        Title
                    </Heading>
                </CardHeader>
                <CardBody>
                    <Text>body</Text>
                </CardBody>
            </Card>
        </div>
    </>
}

export default withSelect((select, props) => {
    return { media: props.attributes.media.id ? select('core').getMedia(props.attributes.media.id) : undefined };
})(_Edit);