import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './DocumentVerification.css';
import ProgressBar from '../../../animations/progress-bar';
import Manual from './phases/Manual';
import { PassportDataFirtPart, PassportDataSecondPart } from './phases/PassportData';
import PassportFace from './phases/PassportFace';
import Congratulations from './phases/Congratulations';
import DocumentsClass from "../../../Classes/Documents-class";

const DocumentVerification = () =>{

    const params = useParams();

    const DOCS = DocumentsClass; 

    const [progressPhase1, setProgressPhase1] = useState(0);
    const [progressPhase2, setProgressPhase2] = useState(0);
    const [progressPhase3, setProgressPhase3] = useState(0);

    const [ passportPhase, setPassportPhase] = useState(4);
    const comps_passport = [<Manual setPassportPhase={setPassportPhase}></Manual>,

                            <PassportDataFirtPart setPassportPhase={setPassportPhase}></PassportDataFirtPart>,

                            <PassportDataSecondPart setPassportPhase={setPassportPhase} DOCS={DOCS}></PassportDataSecondPart>,

                            <PassportFace setPassportPhase={setPassportPhase} DOCS={DOCS}></PassportFace>,

                            <Congratulations setPassportPhase={setPassportPhase} DOCS={DOCS}></Congratulations>
    ];

    useEffect(() => {
        switch (passportPhase) {
            case 1:
                setProgressPhase1(50);
                break;
            case 2:
                setProgressPhase1(100);
                break;
            case 3:
                setProgressPhase2(100);
                break;
            case 4:
                setProgressPhase3(100);
                break;
            default:
                setProgressPhase1(0);
                setProgressPhase2(0);
                setProgressPhase3(0);
                break;
        }
    }, [passportPhase])

    return(<Fragment>
        <div className="page-wrapper">
            <div className="document-verification-content">
                {params.document == 'passport'?
                    <div className="document-verification-block">
                        <div className="document-verification-passport-annotation">
                            <h1>Проверка паспорта</h1>
                            <p>Проверка паспорта - это просто и безопасно. Мы не публикуем и никому не передает фото паспортов и ваше фото с паспортов.</p>
                        </div>
                        <div className="document-verification-passport">
                            <div className="document-verification-passport-progress-bars">
                                <div className="document-verification-passport-progress-bar-1">
                                    <p>Паспортные данные</p>
                                    <ProgressBar bgcolor={'#3838CE'} completed={progressPhase1}></ProgressBar>
                                </div>
                                <div className="document-verification-passport-progress-bar-2">
                                    <p>Фото с паспортом</p>
                                    <ProgressBar bgcolor={'#3838CE'} completed={progressPhase2}></ProgressBar>
                                </div>
                                <div className="document-verification-passport-progress-bar-3">
                                    <p>Подтверждение</p>
                                    <ProgressBar bgcolor={'#3838CE'} completed={progressPhase3}></ProgressBar>
                                </div>
                            </div>
                            {comps_passport[passportPhase]}
                        </div>
                    </div>
                :
                    <div  className="document-verification-">

                    </div>
                }
            </div>
        </div>
    </Fragment>);
}

export default DocumentVerification;