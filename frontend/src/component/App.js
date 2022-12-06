import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import succesImgPath from "../images/succes.svg";
import unSuccesImgPath from "../images/unsucces.svg";
import * as Auth from "../utils/Auth";

function App() {
  const [isPopupAvatarOpened, setIsPopupAvatarOpen] = React.useState(false);
  const [isPopupProfileOpened, setIsPopupProfileOpen] = React.useState(false);
  const [isPopupAddPlaceOpened, setIsPopupAddPlaceOpened] =
    React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [isPopupImageOpened, setIsPopupImageOpened] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const [selectedCard, setSelectedCard] = React.useState({});
  //данные пользователя владельца инфо, карточек
  const [currentUser, setCurrentUser] = React.useState({});
  //данные авторизованного пользователя
  const [userEmail, setUserEmail] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSucces, setIsSucces] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log("Ошибка API при загрузке первоначальных данных!", err);
      });
  }, []);

  
  React.useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    Auth.getUserEmail(jwt).then((data) => {
      setIsLoggedIn(true);
      setUserEmail(data.email);
      navigate("/");
    }).catch((err)=>{console.log("Ошибка при проверке токена: ", err);});
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((cards) =>
        cards.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
      );
    }).catch((err) => {console.log("Ошибка при лайке карточки: ", err);});
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((oldCard) => oldCard._id !== card._id));
    }).catch((err) => {console.log("Ошибка при удалении карточки: ", err);});
  }

  function handleEditAvatarClick() {
    setIsPopupAvatarOpen(true);
  }
  function handleEditProfileClick() {
    setIsPopupProfileOpen(true);
  }
  function handleAddPlaceClick() {
    setIsPopupAddPlaceOpened(true);
  }
  function closeAllPopups() {
    setIsPopupAvatarOpen(false);
    setIsPopupProfileOpen(false);
    setIsPopupAddPlaceOpened(false);
    setIsPopupImageOpened(false);
    setIsInfoTooltipOpened(false);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsPopupImageOpened(true);
  }

  function handeUpdateUser(user) {
    api
      .patchUserInfo(user)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка API при обновлении данных пользователя!", err);
      });
  }

  function handleUpdateAvatar(url) {
    api
      .changeAvatar(url)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка при обновлении аватара: ", err);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .postNewCard(cardData)
      .then((newCard) => {
        console.log('newCard - ', newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка при добавлении карточки: ", err);
      });
  }

  const handleLogin = (email, password) => {
    Auth.authorise(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setUserEmail(email);
        navigate ("/");
      })
      .catch((err) => {
        console.log("Ошибка - ", err);
        showMessagePopup(false);
      });
  };

  const handleRegister = (email, password) => {
    Auth.register(password, email)
      .then((data) => {
        showMessagePopup(true);
        navigate ("/sign-in");
      })
      .catch((err) => {
        console.log("Ошибка - ", err);
        showMessagePopup(false);
      });
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate ("/sign-in");
  };

  const showMessagePopup = (isSucces) => {
    isSucces ? setIsSucces(true) : setIsSucces(false);
    setIsInfoTooltipOpened(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      
        <Header isLoggedIn={isLoggedIn} email={userEmail} onLogout={logOut} />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />

          <Route
            exact
            path="/"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isPopupProfileOpened}
          onClose={closeAllPopups}
          onUpdateUser={handeUpdateUser}
        />
        <AddPlacePopup
          isOpen={isPopupAddPlaceOpened}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isPopupAvatarOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          onClose={closeAllPopups}
          buttonText="Да"
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isPopupImageOpened}
          onClose={() => {
            closeAllPopups();
            setSelectedCard({});
          }}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpened}
          onClose={closeAllPopups}
          message={
            isSucces
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }
          imagePath={isSucces ? succesImgPath : unSuccesImgPath}
        />
   
    </CurrentUserContext.Provider>
  );
}

export default App;
