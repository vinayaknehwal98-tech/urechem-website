"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HomeSection } from "@/components/home/home-section";
import { AnimatedImage } from "@/components/media/animated-image";
import { proofMetrics } from "@/data/homepage";

const proofBackdrop =
  "data:image/webp;base64,UklGRmoTAABXRUJQVlA4IF4TAACQiQCdASoIAiQBPvV0sVSqpioopTI6SVAeiWVu7oG0DCeCRq6fX8mm9buNMMwBfA35npg3GHO2voH7YdquRrtR6we/P5LqFnT6gTq99Z6SmyU+DP7Z/7B/cof0U2Us1lTGaypjNZUxmsqYzWVMZrKmM1lTGaypjNZUxmsqYzWVMZrKmM1lTGaypjNZUxmsqYzWVMZrKmM1lTGaypjNZUxmsqYtxTRYT5bbC6tEQT8uPGM1lTGaypjNU4wixN4EXqp8RX7xUUOHuzF8j0pm9Ho7whuTykTGP7tG6YxrtoqqxmhPWF4LX5o306cIagpImB6Bgdv3z895h1qxBt5Ncofxo2FcYft6qf3A+OBXnINPPZ0nWR1PNHb/OOF4kVfCr+qGdkLQAPstNrdlUZQ8DAG4C7ecTn2GxSKzQ39+3XUK2TQbQFSaJNRnj5ZLmP2RTykARtTBRGZzrpJjvCR4LjCQFc4Jbq1ImpE5J/hjwZtUlxYsIqOlYh4P0tgP0ae+9XdwtsheF5gpviRZRgKae9COA/HBjRRPpv6GEuVTuxlMfxwKj9fuvQ56XNgTBnudZNaPx70HzzDF7y2QJxh1vy8ncRS46zf2Z815PhOFSH5AnIWcyfwhXPxGlg/AnSqNynWy045WLU33BiJQoCxkegZbfa6TJ4I6twmxzUPjskeM31FXCcHRw+Gf9DMLVxDX0l4/W9u2537ozt8R6D4IS8R3OHZ850rEL4LU/73hPRXz4FmoL6gyity7vfXKzmSqpEpk2u1nyXjWqDQgn7Jyk+vPC1rGcqfgx9qdzGfTaYHMV1/090FWGy4AW5RXr2quGNE7Qa7FdmELHZU5LRrslKavl8KsTjhQFORjnB+CUB+5sJo5BDxzcZcgT9wiT2UPn+JJ880KHPd6ZnOzdxCmLOvG//Gquz5EtHRiW1F0kPFKC1nQGLJzPzOBqotWC+cZujbjEm+XWdGCV+hMfPU7rqhc9xHC7U6IuxmstrNcpa7xnM4+7eS3+z00gF5xOcB3VoStJ7Yt7FsQhFbmtn6kY3i4otSPz5kUIDPSTpIuHSm+2XNfaxb+2yQr4KA7MMl0o264y7QouDiEfIIF67c5torwkKKxT2EwTFOL7V5jnmjOPlaMygFhZpKUyDZHhIqPYWTRY70+YL+h1oLVCi+skE3CjMV9LWWMKzrFEXJqn/Y8YzVZu6VJUI/669aPkcMtI+Rwy1ey5LWmaS64XanAIzQBXs8VF5RIjLkBTGa+szPIKpP9SkDbAzG64b5oD330T3M1GuBLDT9FNjfQ2s7+q8SQm9KsJ4y+v85WHaHn1dKIbg25ZbO58eUcE1bP+wRTOR7MAAyjIp7LDOEtq1eOE9tYr7HjGf4fcTIkBUDLYOogOjXxBbRXlLDgKYzYlIdljYZi+5DeIn9EcgOyaSBMtiLKmX61OCR6UqC7OVDc3JTAmWxI9O+3iJ/RHVW3iJ/RHIDo7EgwAAD+/OAAAAAAAAAAAAAAAAAAAUPTEyQYd6VrEvv1RbBfY3spDfrCnI66An9B+5AAA68FQnJal2/UPw7IevMfOb26OtFb0yIjnwmXXLj5Pqlrw+AcQBJxmcGsUs0lCn4cT9xcLbgt62lvV82pDqyRTcfDKyq/OHeWudOo/+uJsmq19o7PF2tny028f3nfFgFF2sE5m4ba2dkWPhXiSyoYVKNikclsCTYjD27d18iycpx7Frg/IEAzcyrU/ucZBA4IfIZ1N2CoCTtFSKCRlv5RIvoMGdeBAhHprsV/gYn40sMK9Kk89qRyn68dlc4xRN0vZRgxZEk6IsFb8eY4ZQtpjaVSVdmuAs68q4Zlq3FLOdzb5Rzwj/Z3JUDE82Fg9QfWeSvF9qU66P0VeaD94kwCyJvQqx7MnTC9zOP5rxQa2kGbKPCgw2i0kx/iRhihWaGbdIAzF6qghfnJmsEMt08hvQKUXgPs9PiDaO9EgA5m202Wquzdz7Yr5cGgm/iQ2hIfnKujotgFbfVPrTY8OWRByVL8Oj5J79s9pRVjAYmsnyoH3pz1eT+nyxHrK3BoG69mlbyE7YmnSfWKixS1s7pLc3HKhgycSRgHkMZ34exIMPXS2TLBmeGZcHx3tw69w4vRUO64BrrM3GlQrgy7mOmtJTfYogafdUEPhiomGnxa+LpG0b29JIqRbmlbMp7+7qE34UBU2YYzEaSWigj3CTxEu387MUZYCBnI2Bwr7JLADk8Hn/Hmfm4Gi12ebuBfnqw5ZkVmdUciyWMMam2baQ4g9+vqX8mzMQfn9gpxjqqbZuayiSkQRpyFo50q6yCYphUZVqJsPo6MNyil/PzmXqk8hi1IsO6IhoR21U7Ma55+KsIwytrbMDtabnRcmKC+7CwQXw4oHm2/FMnPa0r+gGdSJZNVEOqgjFaYO9VtiNX20cmi0jOyU9brXJwbpAbvdDLV//hyyHPNFTKZON4jHHEP529Lfoph1ZMSKfDTqB8nIumflmTnk5gd45qOIJM7b1tTq2u5pDg0m2AOX5bfPZvxkXUnrPBRKYCjUzFA1b1ecxpxqALTEaRmO7ZNR6nDQKcGVypN0bLN1R4sE0D4q0qTlYvnUBPBuvV3suSr3UyLDT1oe6dZFw5DfS8f13rgx1JL5hdfwtgXrxDCqxamk6DbtDofYdEyD4Blz/3plGJoc+CnASJxtWvAg/Ac4bmSloeFQI2XkMriae90IPrAzxf8stD6mMQqVRdwJEPLWb4h7yO7gawjdlcKo3s2TF1JyXeQPQgsFgSKtCYETZAV+5Lo+asfwqu9N9fKowW9dUaWzH/y7ddjh7Mynsm00uC42+JHZMlyt2XLMRVbzabB9AateaEEF4WgHWCRKDwCwVLVtszyJvvPkZa8UQQQbPq1aHWLMWCFr4sz4B7cMlAsz7nMY55K356aWT0AQ9AJWa0aiHYiCR1QW5VSpiH/uhG0EfTL0aR/RBHeo6p1TfdfaGETnG9ZWOfmCFqBTYwOU+WgAJtXwCmDPMeZXNIwbgHMNBurpawOgIm7BETHO53nKYCExYcn6B2otNAyEMZPRfSUHoA5fEFB21ww6v62egSDF1ZsVQdLoR3SiwZ7tBivP0LaRda7L0+gLumHRaQ64q0lNWC46km0OIxtMCeGbJ9bRTpnxykim2E+cpCjLDpQN/Sqjp4AqcEnqYEEEM5dVKraDdp99KJhxQD5MhZx218LAq9bYwm46IyRedQF3lTFwAfnAFPWQTVodkisnJzUryrA4Xxx4WFGHMon6iKFpY8FVlZxz9u0fwsd96tdABjnzID5XQcgmNg1VPMBGKl/oTxhRJ5bttDAgDhDzRKjKs567e2sT+5gr1LlmXAjBFc3/YerjTDF65Yc8lgtHr4WEKllasOyxMFp9ElBL78iIjF5rmIPFTdflvDsx1gxeJaw3VkkJaljsm15eXBhmu1XE+xfGa1HwFALgyxFZEZPvZpb3Prg+z9rsTFRH2jwjYi5VGKlIsMQduW1AYb3htbQjSMArsKCHdiaVwxTYfwhXXeNaE0jMX/X+76/mIVWy0Um/KLahPGgDiebWkIeEumOhdfXcuc4wApAwEbpZn4pKJcdVAQYzv0GYRmGcVALyj9ZTyTgZRs7QCeLdKbXmpbrp76yZdO3BAlkJyZvWPY2/cZcO1iIsHPpgKmKr+csIPMJbLp+YNC1e6falBGHUIyHizDQt4iYVtyuom/WDCvtEeOBqsx+tFD4d09VPcvNbJzmUq9Hb5VtqCnw+YMCNDp+F7ee9eLeCWesqqT26ipDkJCkdMbXBtfOvPYXIiAyqkRFHFxPQyxtbp22uqDW5OQzTMaGzPMppqVTpP7T5IaU7L4fxl7ZL1G9go1e8awdAQNPJ6dTES6ETyyLxUasBDWsylKXd0YPvzguiPBUeBlaJLNY6b1UgY5OUGTtqqns+FU1F3/dUePdP6eaBvf+Mui/4VsnJ190uXhmTy1f4E+imSVHssbMfdRNXKhvUmjPct0dvpcEeh63UFGjj8In+CKwFU45vn1l3uHIKs+Pk8pTQ0XGFF//6JOWnA/XVetLA4pkW4QKNbj1wM3T8G0WV/kxO7tIyt5/y/fE1yecM2cgnCmN0eLZbtmksTXKAPMoswdj3SkB3TwqgNGAy3DJpVxrWYhW2geWyLoeb8C136E3ZQSR0NxlvxIFeluwqq/1W+6Io/h9vZNEL5d25ctzOQaPu5q0RHl57N3GDEBQCNo3N4fqV6eh6y6zFTY4y/yoCt1GNTFt0DOFpkDlk0oTfYVdZukOwalhYrQkRcYPvn6AxxpVpsfHChuI4Mm4KU1QsHwKNMs6ePJierHDKWiUxI4Fql+UdB3LRUahSfboqj6zESSVuFAi/zroHtWK/0VQz2UvPQp0Xw9yNLr3fBbpzlhbv/USRiw9Q1rpy1rMu579zVYIib2BLqTV1ShVS/xV4dUwisdgn+u9rm+xwhY2SZruvxJTAehNPTUvhEvtW2bc5qJWQwWrYx6zpHtg/B0tinqb4d/D28l96FeaWdYwlIpQ03lMYqVtIzfTcUtt9GWYFSHcouobn5KdYmWtD/uscda/pjCVd4tsK9oigPdkn2h97c+OrxUPG4q3zPw2fxpBD39H+Xp/1Xk1MLelxzKVnYAN5myrJ0abWBvhPPYGlL27fVMLx75cY6aHLWQSOzmqMJcoXqLJnMct8GAVbmNu5aDHBvHnx3YYqNICE7AOEZ9eqEliD4bUEoxCLujbXa7Z/tTaZ8xjWAAML8n1Q3gBaT2NEno7zVY2eklSBBfluyqCFwVdCGM6sK963wZVrwH9MoQq/bE9Jf7wsUKUYhLMhyR9rMXC2M7lfINKAu3EmOnoC08KPW/kTRYzExQ2dFlsh+AKm4DCHiqsVfc8XmxFBKCj/X+rgAqDgGv8pDoI60agbvD5PR0vm061T1kirje0NE6rrEpScguALAg3hMXa5gflT+O/yxmVgMoizRjQ+aEuBu7d6Ya+5TvJwHiqE+/wtwOeLBLNEdhp0pQxgjDa8SUFLsNUS+jteZJy0HIvZ2Ao5WdGXe5gOZQtETlsNPIfAVXa5EIE6TXhWDxOKKPsmBrYjLWZS+rn37avsKjKkbNtCyfLsEW/08zvVru6QTIGjs+KllTx8+D1wKuGB7OTgEmOTLwrQnrmbkmhVDVeZs8fZutBANtRtNrRwT5FLUm9JiBCszKwvwAAKkroKDjo7HLOxZZZ7KyMJRC2OZV0d1zflMAwfupR2WlMr/W0WVJw3n0WDubF5GV+2fGnv6ZfQbMYEOvLS99qmnqCnwNI6JaBf4fRb/oHvqcIPDXu+1M3ClvkKwYGn10NpX5pu/UamzzX4Iw4huFopB4XD5dOgK368LeSHD84wdaJ02kqbeZVn5dXjUxs2mrjrrzgjipRJfbfYGICIWLhuYu+b/Ha/WcxA85OHJPkz3t7uUytv+9Ei8y5Le3H+9Xqgy8B1SlPNN4Ai28pZiinpL+jakR0OM8/DswZw0vloljsvuM95JurFXifRz+McsYUy5c8tATVJ/N27BWP04rgYu3qRyg65WXbKDRu2h1h03T8hVQW5wNR3UWhssV6DVUHDdEVIzDhOP8icBwVbO13xKZumbaKtl4qZ2DwzLazsIdTra+RwS0t5+EMv6u6i+6gl6DIAWxf1drv1X8n0hnrYWDYICgyZWtKvVnSVcso9t8D52zeOqgvmhXqZjQl/mBc0DXcjT2uE/AkON/nQCzbEbNJLShj1XG8YvEZy4szMSbnDKUZ/qF7FYtoQbOb53ge/5TVMC/qWXl1bY0IRGrhUDN0JDdRux40bhTpH4sbGXuJsPFLNoTnTKc5bK0AYP3/a6L2hP0HUyOcvzoBvdKYZ6Hm55+5HpFVzD3G6CttLEv2knvHPCY9Ah+YzT9VAV2oNhYahcRibDbARF2liyBW12/qNfSq+Lzqyl8fi1EgX0zWEqAwmIC8aAcDLVzvDN9hYUXg7Ma9IZlX6SAL7YqHM74ngdltvnrbDbRjbiUqutoHerClYABMF4dCWuEdQk3yHxD4A+8Eawng88RLqCWsXXqLV9cKnstUz596X+bFtQsRTGpkFZ05tv70Cw7DfYh4fMTsBY3Io0nmZeEAYjgAAAH3LwaOWD/XwCpfApUPcRzxbuTQxFXJoCFXFrp6w3AzDKSlsRRQ7L8EEWj7O3nj7um7gnouFDua1P78BVZ59nRUHUE81KJejCRet/MxOLrAQ/IPqOUEf8lfE2DX1WHghL5sXxU808j4/pGgs0NTYa8I65srYtdaZstvBhoGZ8oJfALel5LVda40gJfFu94jFTKHeBxeJ1Py5YPKpOtvc/QBi1DtVTgeSWpHxN82MQjeItvUE+qMyIHole6P6dEF+gl7bfVUtaKhVfPwa9Cqzr2juXKyhtrkUAowL7d9u/NZXpAdu2qajGWajqFlzmrr1ipkWjhJFG9Dw/aBmp6wzP4HlP5qdgnioxbTfTAe8GYBd1KvlXDZ/MNPlFv1QgsHhRwRAh0sRU1tySJnI4DPLRGKm0lp3QVY199j7nFrYbY5jsD2vL+yoDwrYw2AUzElJz1840Q7EtcOISzzLLCurCadOEaSAEhMQAAAGMcHfmlFgAAAAAAAAA==";

export function ProofExpertiseSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <HomeSection
      className="bg-[radial-gradient(circle_at_80%_14%,rgba(45,212,191,0.1),transparent_30%),linear-gradient(180deg,rgba(7,26,45,0.95),rgba(4,17,31,0.98))]"
      eyebrow="Proof and expertise"
      id="proof-expertise"
      title="Research-led. Application-focused."
    >
      <div className="relative">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[18%] -top-64 z-0 w-[82%] max-w-[68rem] overflow-hidden opacity-[0.22] blur-[3px] sm:-top-72 lg:-right-[12%] lg:w-[72%]"
          data-no-site-motion
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, x: 36, y: 22 }}
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                  x: { duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
                  y: { duration: 11, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
                }
          }
          viewport={{ amount: 0.08, once: true }}
          whileInView={
            shouldReduceMotion
              ? undefined
              : { opacity: 0.22, scale: 1.03, x: [18, -8, 18], y: [10, -10, 10] }
          }
        >
          <img
            alt=""
            className="h-auto w-full select-none object-contain mix-blend-multiply"
            draggable={false}
            src={proofBackdrop}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-white/5 via-white/30 to-white/90" />
        </motion.div>

        <div className="relative z-10 grid items-stretch gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <AnimatedImage
            alt="A technician monitoring polyurethane foam compression testing in a modern materials laboratory"
            className="min-h-96"
            imageClassName="object-[46%_center]"
            sizes="(min-width: 1024px) 44vw, 100vw"
            src="/images/materials-testing.webp"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {proofMetrics.map((metric, index) => (
              <MetricCard index={index} key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      </div>
    </HomeSection>
  );
}

function MetricCard({
  index,
  metric,
}: {
  index: number;
  metric: (typeof proofMetrics)[number];
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.045] p-6 shadow-[var(--shadow-soft)]"
      initial={shouldReduceMotion ? false : { opacity: 0.94, scale: 0.988, y: 10 }}
      transition={{ delay: index * 0.07, duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.16, once: true }}
      whileHover={shouldReduceMotion ? undefined : { borderColor: "rgba(103,232,249,0.34)", scale: 1.018, y: -4 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
    >
      <p className="font-mono text-sm font-semibold text-cyan-100">
        {metric.value.toLocaleString()}
        {metric.suffix}
      </p>
      <h3 className="mt-3 text-xl font-black text-white">{metric.label}</h3>
    </motion.article>
  );
}
