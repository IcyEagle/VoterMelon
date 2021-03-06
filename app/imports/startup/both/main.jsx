import React from 'react';
import { renderWithSSR } from 'meteor/communitypackages:react-router-ssr';
import { FastRender } from 'meteor/staringatlights:fast-render';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App';

renderWithSSR(<App />);

// seems like FastRender can't read subscriptions from withTracker function
// so it's necessary to configure them manually
if (Meteor.isServer) {
    FastRender.route('/', function () {
        this.subscribe('questions');
        this.subscribe('users.top');
    });
    FastRender.route('/show/:id', function ({ id }) {
        this.subscribe('decisions.self', id);
        this.subscribe('decisions.friends', id);
        this.subscribe('question.id', id);
        this.subscribe('decisions.others', id);
    });
}
