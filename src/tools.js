export const checkError = (type, value) => {

    switch (type) {
        case 'userName':
            if (!/^(\s|\S)*(\S)+(\s|\S)*$/gi.test(value)) {
                return "no puedes dejar espacios en blanco";
            } else {
                return "ok";
            };
        case 'password':
            if (! /^(\s|\S)*(\S)+(\s|\S)*$/.test(value)) {
                return "no puedes dejar espacios en blanco";
            } else {
                return "ok";
            };

        case 'password2':
            if (! /^(\s|\S)*(\S)+(\s|\S)*$/.test(value)) {
                return "no puedes dejar espacios en blanco";
            } else {
                return "ok";
            };
        default:
            return "ok";
    }
};