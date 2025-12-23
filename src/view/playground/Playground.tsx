import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PLAYGROUND_ITEMS } from "./playground.config";
import { RiGamepadLine } from "react-icons/ri";

const Playground = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="space-y-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-emerald-400 font-mono text-sm tracking-wider uppercase"
          >
            <RiGamepadLine className="text-xl" />
            <span>Experimental Lab</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            The Playground
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-neutral-400 leading-relaxed"
          >
            A collection of weird experiments, absurd interfaces, and code that
            probably shouldn't exist. Proceed with curiosity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLAYGROUND_ITEMS.map((item, index) => (
            <Link
              to={item.path}
              key={item.id}
              className="group relative block h-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                className="h-full bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 overflow-hidden hover:border-white/20 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/10"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10 space-y-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl text-white shadow-lg`}
                  >
                    <item.icon />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 text-xs font-mono text-neutral-600 group-hover:text-white transition-colors">
                  OPEN_EXPERIMENT_0{index + 1}
                </div>
              </motion.div>
            </Link>
          ))}

          {PLAYGROUND_ITEMS.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
              <p className="text-neutral-500 font-mono">
                No experiments online yet. The lab is booting up...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playground;
