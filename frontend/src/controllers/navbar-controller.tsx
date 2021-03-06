import React, { useEffect, useState} from 'react';
import { MyNavbar } from '../components/navbar';
import { RecipeInputPage } from '../pages/recipe-input-page';
import { RecipeCollection } from '../pages/recipe-collection-page';
import { User } from '../types';
import { useRecipeAppModel } from '../model';
import { getRecipes } from '../utility';


export const NavbarController: React.FC<{
    user: User
}> = ({user}) => {
    
    //const [page, setPage] = useState<string>("collections");
    const [model, dispatch] = useRecipeAppModel(user);

    useEffect(() => {
        //this happens after the page we show them renders
        getRecipes(user, dispatch)
    }, [user])

    if (model.activePage === "#RecipeCollection") {
        return <div>
            <MyNavbar callback={pageName => dispatch({
                kind: 'CLICKED_NAVBAR',
                payload: pageName,
            })}/>
            <RecipeCollection recipes={model.recipes} dispatch={dispatch} />
            </div>
    }

    return <div>
        <MyNavbar  callback={pageName => dispatch({
            kind: 'CLICKED_NAVBAR',
            payload: pageName
        })}/>
        {/* <RecipeCollection /> */}
        <RecipeInputPage model={model} dispatch={dispatch}/>
    </div>
}