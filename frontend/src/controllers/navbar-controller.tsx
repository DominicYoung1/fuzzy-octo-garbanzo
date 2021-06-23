import React, { useState} from 'react';
import { MyNavbar } from '../components/navbar';
import { RecipeInputPage } from '../pages/recipe-input-page';
import { RecipeCollection } from '../pages/recipe-collection-page';


export const NavbarController: React.FC<{}> = () => {
    
    const [page, setPage] = useState<string>("collections");

    if (page === "#RecipeCollection") {
        return <div>
            <MyNavbar callback={pageName => setPage(pageName)}/>
            <RecipeCollection />
            </div>
    }

    return <div>
        <MyNavbar  callback={pageName => setPage(pageName)}/>
        <RecipeCollection />
        <RecipeInputPage />
    </div>
}