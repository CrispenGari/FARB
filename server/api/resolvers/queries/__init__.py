from ariadne import QueryType
from api.types import * 

query = QueryType()
@query.field("meta")
def meta_resolver(obj, info):
   return Meta(
      programmer = "@crispengari",
      main = "First Aid Recommendation Bot (FARB)",
      description = "This Bot is a virtual assistance BOT that helps humans in First Aid Recommendations Treatments. Given a message or description of illness, the bot should be able to 99.11% accurately give the user First Aid Recommendations.",
      language = "python",
      libraries = ["pytorch", "torchtext", "spacy"],
   ).to_json()
   