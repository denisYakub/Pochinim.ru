import { Fragment } from "react";
import { useParams } from "react-router-dom";
import './DocumentVerification.css';

const DocumentVerification = () =>{

    const params = useParams();

    return(<Fragment>
        <div className="page-wrapper">
            <div className="document-verification-content">
                {params.document}
            </div>
        </div>
    </Fragment>);
}

export default DocumentVerification;