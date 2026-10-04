
import logo from '../assets/logo.png'
import { GameCard } from '../types/definitions';

type CardProps = {
    card: GameCard;
    flipped: boolean;
    disabled: boolean;
    onPick: (cardId: string) => void;
}


const Card = ({ card, flipped, disabled, onPick }: CardProps) => {
    const handleChoice = () => {
        if (!disabled) onPick(card.id);
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
                onClick={handleChoice}
                className="card__back-card"
                src={logo}
                alt="logo"
            />
        </div>
        </li>
    )
}

export default Card
