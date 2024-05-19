import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './MasterProfile.css';
import { contextMaster } from '../../../contexts/contextMaster';
import MainInfoBlock from './MasterBlocks/MainInfoBlock';
import PersonalDataBlock from './MasterBlocks/PersonalDataBlock';
import AboutMeBlock from './MasterBlocks/AboutMeBlock';
import EducationAndExperienceBlock from './MasterBlocks/EducationAndExperienceBlock';
import AddressesBlock from './MasterBlocks/AddressesBlock';
import SercicesAndPriceBlock from './MasterBlocks/SercicesAndPriceBlock';
import ActionBlock from './MasterBlocks/ActionBlock';
import AchievementsBlock from './MasterBlocks/AchievementsBlock';
import ReviewsBlock from './MasterBlocks/ReviewsBlock';

const MasterProfile = () => {

    const params = useParams();
    const prev_page = params.pev_page;
    const email_master = params.email;
    const id_master = params.id;

    const MASTER = useContext(contextMaster);
 
    const [masterInf, setMasterInf] = useState({});

    const [reloadPage, setReloadPage] = useState(true);

    useEffect(() => {
        async function setData(){
            if(id_master){
                setMasterInf(await MASTER.setAllMasterDataById(id_master));
            }else if(email_master){
                setMasterInf(await MASTER.setAllMasterDataById(localStorage.getItem('id-master')));
            }
        };

        if(reloadPage){
            setData();
            setReloadPage(false);
        }
    })

    return(<Fragment>
        <div className='page-wrapper'>
            <div className='master-profile-wrapper'>
                <div className='go-back-to-origin'>
                    {prev_page?
                        <div className='go-prev-button'>
                            <div></div>
                            <Link to={`/${prev_page}/${localStorage.getItem('mail')}`} className='link-as-text'>Все специалисты</Link>
                        </div>
                    :
                        null}
                    <div className='navigation-profile-wrapper'>
                        <button className='button-grey'>Обо мне</button>
                        <button className='button-grey'>Образование и опыт</button>
                        <button className='button-grey'>Договор и гарантии</button>
                        <button className='button-grey'>Фотографии</button>
                        <button className='button-grey'>Услуги и цены</button>
                        <button className='button-grey'>Отзывы</button>
                    </div>
                </div>
                <div className='profile-info'>
                    <MainInfoBlock MASTER={MASTER}></MainInfoBlock>
                    <AchievementsBlock MASTER={MASTER}></AchievementsBlock>
                    <PersonalDataBlock MASTER={MASTER}></PersonalDataBlock>
                    <AboutMeBlock MASTER={MASTER} setReloadPage={setReloadPage}></AboutMeBlock>
                    <EducationAndExperienceBlock MASTER={MASTER} setReloadPage={setReloadPage}></EducationAndExperienceBlock>
                    <AddressesBlock MASTER={MASTER} setReloadPage={setReloadPage}></AddressesBlock>
                    <SercicesAndPriceBlock MASTER={MASTER} setReloadPage={setReloadPage}></SercicesAndPriceBlock>
                    {useParams().pev_page?null:<ActionBlock></ActionBlock>}
                    {useParams().pev_page?<ReviewsBlock MASTER={MASTER}></ReviewsBlock>:null}
                </div>
            </div>
        </div>
    </Fragment>)
}

export default MasterProfile;