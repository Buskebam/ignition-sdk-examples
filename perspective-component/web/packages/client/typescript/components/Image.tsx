/**
 * Example of a component which displays an image, given a URL.
 */

import * as React from 'react';
import { Component, ComponentMeta, ComponentProps, SizeObject } from '@inductiveautomation/perspective-client';
import SignatureCanvas from 'react-signature-canvas';
import {Button} from 'reactstrap';


// the 'key' or 'id' for this component type.  Component must be registered with this EXACT key in the Java side as well
// as on the client side.  In the client, this is done in the index file where we import and register through the
// ComponentRegistry provided by the perspective-client API.
export const COMPONENT_TYPE = "rad.display.image";


// this is the shape of the properties we get from the perspective 'props' property tree.
export interface ImageProps {
    url: string;   // the url of the image this component should display
}


export class Image extends Component<ComponentProps, any> {


    render() {

        return (
            <div {...this.props.emit()}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <SignatureCanvas style={{flexGrow: "1"}} penColor="blue" />
                    <Button variant="primary"> Save </Button>
                    <Button variant="primary"> Clear </Button>
                </div>
            </div>
        );
    }
}


// this is the actual thing that gets registered with the component registry
export class ImageMeta implements ComponentMeta {

    getComponentType(): string {
        return COMPONENT_TYPE;
    }

    // the class or React Type that this component provides
    getViewClass(): React.ReactType {
        return Image;
    }

    getDefaultSize(): SizeObject {
        return ({
            width: 360,
            height: 360
        });
    }
}
