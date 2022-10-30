import React, { memo } from 'react'
import { Draggable } from '@hello-pangea/dnd'

import { CardData } from 'types/card'

type DeleteCard = (columnUuid: string, cardUuid: string) => void

type CardProps = {
    card: CardData
    index: number
    deleteCard: DeleteCard
}

const Card: React.FC<CardProps> = ({ card, index, deleteCard }) => {
    return (
        <Draggable draggableId={card.card_uuid} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="flex justify-between mb-2 pl-1 border border-gray-200 rounded-sm hover:cursor-pointer"
                >
                    <div>{card.card_name}</div>

                    <span
                        data-test-id={`delete-column-${index}`}
                        className="ml-1"
                        onClick={() =>
                            deleteCard(card.column_uuid, card.card_uuid)
                        }
                    >
                        &#x2716;
                    </span>
                </div>
            )}
        </Draggable>
    )
}

const CardListBase: React.FC<{
    cards: CardData[] | undefined
    deleteCard: DeleteCard
}> = ({ cards, deleteCard }) => (
    <div>
        {cards?.map((card, idx) => (
            <Card
                key={card.card_uuid}
                card={card}
                index={idx}
                deleteCard={deleteCard}
            />
        ))}
    </div>
)

const CardList = memo(CardListBase, (props, nextProps) => {
    if (props.cards === nextProps.cards) {
        return true
    }
    return false
})

export default CardList
