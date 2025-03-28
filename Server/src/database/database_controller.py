from sqlalchemy import Engine, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker, scoped_session
from config import Config as Cnf


class DatabaseController:
    is_ready: bool = False
    Base = declarative_base()
    engine: Engine

    @classmethod
    def init(cls):
        if cls.is_ready:
            return

        engine = create_engine(Cnf.DB_URL)
        cls.engine = engine

        cls.Base.metadata.create_all(bind=engine)

        cls.is_ready = True
