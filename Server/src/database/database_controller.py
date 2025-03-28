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

    @classmethod
    def session(cls, f, commit=False):
        ''' DB操作用 デコレータ '''
        def _wrap(*args, **kwargs):

            # セッション作成
            err = None
            session = cls.create_session()

            # 処理を開始
            result = None
            try:
                result = f(*args, **kwargs, session=session)
                if commit:
                    session.commit()
            except Exception as e:
                err = e
                session.rollback()
            finally:
                session.close()

            # エラーを発生
            if err:
                raise err

            return result
        return _wrap

    @classmethod
    def create_session(cls) -> Session:
        return scoped_session(sessionmaker(cls.engine))()
