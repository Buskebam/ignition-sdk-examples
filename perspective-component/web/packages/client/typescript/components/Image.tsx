/**
 * Example of a component which displays an image, given a URL.
 */

import * as React from 'react';
import { Component, ComponentMeta, ComponentProps, SizeObject } from '@inductiveautomation/perspective-client';
import SignatureCanvas from 'react-signature-canvas';
import { bind } from 'bind-decorator';

// the 'key' or 'id' for this component type.  Component must be registered with this EXACT key in the Java side as well
// as on the client side.  In the client, this is done in the index file where we import and register through the
// ComponentRegistry provided by the perspective-client API.
export const COMPONENT_TYPE = "rad.display.image";

export class Image extends Component<ComponentProps, any> {

    private sigCanvasRef = React.createRef<any>();

    @bind
    clearCanvas()
    {
        console.log("The canvas will be cleared");

        this.sigCanvasRef.current.clear();
    }


    @bind
    handleDraw()
    {
       console.log("The drawing has ended");

       const result = this.sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png;base64", null);
       this.props.props.write('url', result);
    }

    render() {
        return (
            <SignatureCanvas
                canvasProps={{...this.props.emit()}}
                penColor="blue"
                onEnd={this.handleDraw}
                ref={this.sigCanvasRef}
            />
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
