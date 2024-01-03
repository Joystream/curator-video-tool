import PropTypes from 'prop-types';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { register } from '../../actions/auth';

// Define prop types
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  isAuthenticated: boolean;
};

const Register = ({ register, isAuthenticated }: Props) => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    handle: '',
    email: '',
    password: '',
    password2: '',
  });

  const { handle, email, password, password2 } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match', 'danger');
    } else {
      register({ handle, email, password });
      navigator('/curator-list');
    }
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Create A New Curator</h1>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Handle" name="handle" value={handle} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    </section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const connector = connect(mapStateToProps, { register });

export default connector(Register);
