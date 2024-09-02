
import logo from '../assets/logo.png'
import { Image } from '../types/definitions';
import { useImages } from '../context/ImageContext';

type CardProps = {
    card:Image;
    flipped:boolean;
    key:number;
}


const Card = ({card, flipped}:CardProps) => {
    const { setChoiceOne, setChoiceTwo, choiceOne } = useImages();

    const handleChoice = (card:Image) => {
        choiceOne? setChoiceTwo(card) : setChoiceOne(card);
        
    }
 
    return (
        <li className="game-board__card">
        <div className={`card ${flipped ? 'card--flipped' : ''}`}>
            <img
                className="card__front-card"
                src={card.url}
                alt={card.title}
            />
            <img
                onClick={() => handleChoice(card)}
                className="card__back-card"
                src={logo}
                alt="logo"
            />
        </div>
        </li>
    )
}

export default Card
