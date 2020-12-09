import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { likeScreen, unlikeScreen } from '../redux/actions/dataActions';
// icons
import SpecialButton from '../util/SpecialButton'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';

export default function LikeButton({screenId, userHandle, likeCount}) {
   
    // react hooks
    const {likes, authenticated, creadentials:{handle}} = useSelector(state => state.user)
    const dispatch = useDispatch()
    let liked = likes && likes.find((like)=> like.screenId === screenId) ? true : false;
        const handleUnLike = () => {
            // console.log("likeddddddddd")
            dispatch(unlikeScreen(screenId))
        }
        const handleLike = () => {
            dispatch(likeScreen(screenId))
        }
    return (
        <>
         {! authenticated ? 
                    (
                        <Link to="/login">
                            <SpecialButton title="Like" onClick={handleLike}>
                                <FavoriteBorderOutlinedIcon color="primary"/>
                            </SpecialButton>
                        </Link>
                    ) : 
                    (
                     <>   
                        {liked ? 
                        <SpecialButton title="unlike the post" onClick={handleUnLike}>
                            <FavoriteIcon color="primary"/>
                        </SpecialButton> 
                        :
                        (<SpecialButton title="Like" onClick={handleLike}>
                            <FavoriteBorderOutlinedIcon color="primary"/>
                        </SpecialButton>
                        )}
                    {likeCount > 0  &&  <span>{likeCount} {likeCount === 1 ?<span>Like</span> : <span>Likes</span>}</span>}
                    </>
                    )
                    }   
        </>
    )
}
