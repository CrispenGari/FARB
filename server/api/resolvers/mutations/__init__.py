from ariadne import MutationType
from random import choice
from api.models import *
from api.types import *
from api.models.pytorch import *

mutation = MutationType()
@mutation.field("askBot")
def create_session_resolver(obj, info, input):
    try:
        res = predict_tag(farb_model, input.get('message'), device)
        intent = list(filter(lambda x: x['tag'] == res.tag, intents))[0]
        message = choice(
            intent['responses']
        )
        return {
            'success': True,
            'prediction': res.to_json(),
            'response': BotResponse(message=message).to_json()
        }
    except Exception as e:
        print(e)
        return {
            'success': False,
            'error': Error(
                message = "Something went wrong on the server",
                field = "server"
            ).to_json()
        }