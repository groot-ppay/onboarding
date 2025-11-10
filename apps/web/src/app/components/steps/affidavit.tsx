import { useState } from 'react';
import styles from './steps.module.css';

export interface AffidavitProps {
  accepted: boolean;
  onAcceptChange: (value: boolean) => void;
}

export default function Affidavit({ accepted, onAcceptChange }: AffidavitProps) {
  return (
    <div>
      <h2 className={styles.title}>Declaración Jurada</h2>
      <p className={styles.subtitle}>Lee y acepta los términos de la declaración jurada</p>

      <div className={styles.form}>
        <div className={styles.affidavitBox}>
          <h3 className={styles.affidavitTitle}>Declaración Jurada de Veracidad de Datos</h3>
          
          <div className={styles.affidavitContent}>
            <p>Yo, el titular de los datos proporcionados, declaro bajo juramento que:</p>
            
            <ul className={styles.affidavitList}>
              <li>Toda la información proporcionada es verdadera y correcta.</li>
              <li>Los datos personales ingresados me pertenecen y son verídicos.</li>
              <li>El número de teléfono proporcionado es de mi propiedad.</li>
              <li>Autorizo la verificación de mis datos con organismos oficiales.</li>
              <li>Acepto los términos y condiciones del servicio.</li>
            </ul>

            <p className={styles.affidavitWarning}>
              <strong>Advertencia:</strong> La falsedad de esta declaración puede dar lugar a acciones legales 
              y la cancelación inmediata de la cuenta.
            </p>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => onAcceptChange(e.target.checked)}
              className={styles.checkbox}
            />
            <span>He leído y acepto la declaración jurada</span>
          </label>
        </div>
      </div>
    </div>
  );
}
