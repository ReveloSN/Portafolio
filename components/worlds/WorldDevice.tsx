import { DeviceConnections } from "@/components/molecules/DeviceConnections";
import { DevicePhoto } from "@/components/molecules/DevicePhoto";
import { getCopy } from "@/lib/locale.server";
import type { ProjectDevice } from "@/types/project";

export const DEVICE_SECTION_ID = "dispositivo";

interface WorldDeviceProps {
  readonly device: ProjectDevice;
}

/**
 * Hardware del proyecto: la foto real del prototipo, el recorrido de la información del
 * sensor a la respuesta y las conexiones de cada componente con la placa.
 */
export async function WorldDevice({ device }: WorldDeviceProps) {
  const {
    world: { device: copy },
  } = await getCopy();
  const titleId = `${DEVICE_SECTION_ID}-title`;
  const connectionsId = `${DEVICE_SECTION_ID}-conexiones`;
  return (
    <section id={DEVICE_SECTION_ID} aria-labelledby={titleId} className="world-panel">
      <div className="mx-auto max-w-[1200px]">
        <h2 id={titleId} className="font-display text-fluid-3xl font-extrabold">
          {copy.title}
        </h2>
        <p className="text-fluid-md mt-4 max-w-[62ch] leading-[1.65] opacity-90">
          {device.intro}
        </p>
        <div className="world-device-grid mt-fluid-5">
          <DevicePhoto photo={device.photo} />
          <div>
            <h3 className="font-display text-fluid-xl font-extrabold">
              {copy.flowTitle}
            </h3>
            <ol className="world-device-flow">
              {device.flow.map((step, index) => (
                <li key={step.title}>
                  <span className="world-device-step" aria-hidden="true">
                    {index + 1}
                  </span>
                  <h4 className="font-display text-fluid-md font-extrabold">
                    {step.title}
                  </h4>
                  <p className="text-fluid-sm leading-[1.6] opacity-85">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <h3
          id={connectionsId}
          className="font-display text-fluid-xl mt-fluid-6 font-extrabold"
        >
          {copy.connectionsTitle}
        </h3>
        <p className="text-fluid-sm mt-2 opacity-80">{copy.connectionsIntro}</p>
        <DeviceConnections components={device.components} titleId={connectionsId} />
      </div>
    </section>
  );
}
