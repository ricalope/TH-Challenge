from flask.cli import AppGroup
from .coffees import seed_coffees, undo_coffees
from .posts import seed_posts, undo_posts

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    seed_coffees()
    seed_posts()


@seed_commands.command('undo')
def undo():
    undo_posts()
    undo_coffees()
