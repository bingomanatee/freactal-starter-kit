import _ from 'lodash';
import style from './FieldErrors.module.css';

export default ({
  subject, field, errors, always,
}) => {
  try {
    if (!((errors && errors.length) || (subject && subject.propErrors))) {
      return '';
    }
    let propErrors = subject.propErrors || [];
    if (field) {
      propErrors = subject.propErrors.filter(e => (e.prop === field));
    }

    if (errors && Array.isArray(errors)) propErrors = propErrors.concat(errors);
    propErrors = _.compact(propErrors);

    if (!(always || propErrors.length)) return '';
    return (
      <div className={style.FieldErrors}>
        <ul>
          {propErrors.map(e => (<li key={`${e.error}_${e.field}`}>{field ? e.error : (<span><b>{e.prop}</b>: {e.error}</span>)}</li>))}
        </ul>
      </div>
    );
  } catch (err) {
    return err.message;
  }

};
