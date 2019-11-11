import React from "react";

const ContentRow = props => {
    return (
        <div className="row">
            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                {props.children}
            </div>
        </div>
    );
};

export default ContentRow
