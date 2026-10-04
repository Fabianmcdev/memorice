
import cardBackLogo from '../assets/react.svg'
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
                // The logo is not square: contain it with some inset instead of the default cover crop.
                className="card__back-card object-contain p-[18%]"
                src={cardBackLogo}
                alt="Carta boca abajo"
            />
        </div>
        </li>
    )
}

export default Card
