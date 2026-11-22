import type { DeviceComponent } from "@/types/project";

interface DeviceConnectionsProps {
  readonly components: readonly DeviceComponent[];
  readonly titleId: string;
}

/**
 * Una tarjeta por componente: cómo se une a la placa (I2C, serie, PWM…), qué hace y sus
 * señales. Es una lista: se lee en orden también con lector de pantalla.
 */
export function DeviceConnections({ components, titleId }: DeviceConnectionsProps) {
  return (
    <ul className="world-device-parts" aria-labelledby={titleId}>
      {components.map((part) => (
        <li key={part.name} className="world-device-part">
          <p className="world-device-link">{part.link}</p>
          <h4 className="font-display text-fluid-md font-extrabold">{part.name}</h4>
          <p className="text-fluid-sm leading-normal opacity-85">{part.role}</p>
          <ul className="world-device-signals">
            {part.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
