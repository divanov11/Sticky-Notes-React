import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, useState } from "react";
import { account } from '../appwrite/config.js';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  hero: null,
};

const reducer = (state, action) => {
  if (action.type === "INITIALISE") {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: "appwrite",
  logout: () => Promise.resolve(),
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  updateRecovery: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function getUser() {
      await account
        .get()
        .then(async (user) => {
          setProfile({
            uid: user.$id,
            email: user.email,
            name: user.name,
          });
          dispatch({
            type: "INITIALISE",
            payload: { isAuthenticated: true, user },
          });
        })
        .catch(() => {
          dispatch({
            type: "INITIALISE",
            payload: { isAuthenticated: false, user: null },
          });
        });
    }

    getUser();
  }, [dispatch]);

  const logout = async () => {
    await account.deleteSession("current");
    setProfile(null);
    dispatch({
      type: "INITIALISE",
      payload: { isAuthenticated: false, user: null },
    });
  };

  const login = async (email, password) => {
    await account.createEmailPasswordSession(email, password);
    await account
      .get()
      .then((user) => {
        setProfile({
          uid: user.$id,
          email: user.email,
          name: user.name,
          roles: user.labels,
        });
        dispatch({
          type: "INITIALISE",
          payload: { isAuthenticated: true, user },
        });
      });
  };

  const register = async (name, email, password) => {
    await account.create("unique()", email, password, name).then(() => {
      login(email, password);
    });
  }

  const forgotPassword = (email) =>
    account.createRecovery(
      email,
      `${window.location.origin}/auth/password-recovery`
    ).catch(() => {
      // do nothing
    });

  const updateRecovery = async (userId, secret, password, confirmPassword) => {
    await account.updateRecovery(userId, secret, password, confirmPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "appwrite",
        user: {
          uid: profile?.uid,
          email: profile?.email,
          name: profile?.name,
        },
        logout,
        login,
        register,
        forgotPassword,
        updateRecovery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
