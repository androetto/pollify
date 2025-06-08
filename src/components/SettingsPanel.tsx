import { IConfiguration } from "@/models/Poll";
import PrimaryButton from "./PrimaryButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  configuration: IConfiguration;
  onSave: (config: IConfiguration) => void;
}

export default function SettingsPanel({
  isOpen,
  onClose,
  configuration,
  onSave,
}: Props) {
  // Handler general para campos de primer nivel
  const handleChange = <K extends keyof IConfiguration>(
    field: K,
    value: IConfiguration[K]
  ) => {
    onSave({ ...configuration, [field]: value });
  };

  // Handler para duración
  const handleDurationChange = <K extends keyof IConfiguration["duration"]>(
    field: K,
    value: IConfiguration["duration"][K]
  ) => {
    onSave({
      ...configuration,
      duration: { ...configuration.duration, [field]: value },
    });
  };

  // Handler para monetización
  const handleMonetizationChange = <
    K extends keyof IConfiguration["monetization"]
  >(
    field: K,
    value: IConfiguration["monetization"][K]
  ) => {
    onSave({
      ...configuration,
      monetization: { ...configuration.monetization, [field]: value },
    });
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b flex-shrink-0">
          <h2 className="text-xl font-bold text-[#322A7D]">Configuración</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar panel"
            className="text-2xl font-bold hover:text-[#42389D] cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-6 overflow-auto flex-grow">
          {/* Visibilidad */}
          <section>
            <h3 className="font-semibold mb-2 text-gray-700">Visibilidad</h3>
            <select
              value={configuration.visibility}
              onChange={(e) => handleChange("visibility", e.target.value as IConfiguration["visibility"])}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#322A7D]"
            >
              <option value="public">Pública</option>
              <option value="private">Privada</option>
            </select>
          </section>

          {/* Duración */}
          <section>
            <h3 className="font-semibold mb-2 text-gray-700">Duración</h3>
            <select
              value={configuration.duration.type}
              onChange={(e) => handleDurationChange("type", e.target.value as "votes" | "date" | "both")}
              className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-[#322A7D]"
            >
              <option value="votes">Por votos</option>
              <option value="date">Por fecha</option>
              <option value="both">Ambos</option>
            </select>

            {(configuration.duration.type === "votes" ||
              configuration.duration.type === "both") && (
              <div className="mb-2">
                <label className="block mb-1 text-gray-600 font-medium">
                  Máximo de votos
                </label>
                <input
                  type="number"
                  min={1}
                  value={configuration.duration.maxVotes ?? ""}
                  onChange={(e) =>
                    handleDurationChange(
                      "maxVotes",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#322A7D]"
                />
              </div>
            )}

            {(configuration.duration.type === "date" ||
              configuration.duration.type === "both") && (
              <>
                <label className="block mb-1 text-gray-600 font-medium">
                  Fecha inicio
                </label>
                <input
                  type="date"
                  value={
        configuration.duration.startDate
          ? new Date(configuration.duration.startDate).toISOString().split("T")[0]
          : ""
      }
                  onChange={(e) =>
                    handleDurationChange(
                      "startDate",
                      e.target.value
                        ? new Date(e.target.value)
                        : undefined
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-[#322A7D]"
                />

                <label className="block mb-1 text-gray-600 font-medium">
                  Fecha fin
                </label>
                <input
                  type="date"
                   value={
        configuration.duration.endDate
          ? new Date(configuration.duration.endDate).toISOString().split("T")[0]
          : ""
      }
                  onChange={(e) =>
                    handleDurationChange(
                      "endDate",
                      e.target.value
                        ? new Date(e.target.value)
                        : undefined
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#322A7D]"
                />
              </>
            )}
          </section>

          {/* Seguridad */}
          <section>
            <h3 className="font-semibold mb-2 text-gray-700">Seguridad</h3>
            <select
              value={configuration.security}
              onChange={(e) => handleChange("security", e.target.value as IConfiguration["security"])}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#322A7D]"
            >
              <option value="none">Ninguna</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </section>

          {/* Límite de tiempo */}
          <section>
            <h3 className="font-semibold mb-2 text-gray-700">
              Límite de tiempo (segundos)
            </h3>
            <input
              type="number"
              min={0}
              value={configuration.timeLimitSeconds ?? ""}
              onChange={(e) =>
                handleChange(
                  "timeLimitSeconds",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#322A7D]"
              placeholder="Ej: 60"
            />
          </section>

          {/* Monetización */}
          <section>
            <h3 className="font-semibold mb-2 text-gray-700">Monetización</h3>
            <select
              value={configuration.monetization.type}
              onChange={(e) => handleMonetizationChange("type", e.target.value as "free" | "pay_per_vote")}
              className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-[#322A7D]"
            >
              <option value="free">Gratis</option>
              <option value="pay_per_vote">Pagar por voto</option>
            </select>

            {configuration.monetization.type === "pay_per_vote" && (
              <>
                <label className="block mb-1 text-gray-600 font-medium">
                  Monto por voto
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={configuration.monetization.amountPerVote ?? ""}
                  onChange={(e) =>
                    handleMonetizationChange(
                      "amountPerVote",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-[#322A7D]"
                  placeholder="Ej: 0.50"
                />

                <label className="block mb-1 text-gray-600 font-medium">
                  Presupuesto máximo (opcional)
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={configuration.monetization.budget ?? ""}
                  onChange={(e) =>
                    handleMonetizationChange(
                      "budget",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#322A7D]"
                  placeholder="Ej: 100"
                />
              </>
            )}
          </section>

          {/* Visibilidad de resultados */}
          <section>
            <h3 className="font-semibold mb-2 text-gray-700">
              Visibilidad de resultados
            </h3>
            <select
              value={configuration.resultVisibility}
              onChange={(e) => handleChange("resultVisibility", e.target.value as IConfiguration["resultVisibility"])}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#322A7D]"
            >
              <option value="public">Públicos</option>
              <option value="private">Privados</option>
            </select>
          </section>
        </div>

        {/* Footer con botón de cierre */}
        <div className="p-4 border-t flex-shrink-0">
          <PrimaryButton onClick={onClose} fullWidth>
            Aplicar
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
