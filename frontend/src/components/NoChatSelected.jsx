import { Icon } from "@iconify/react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <Icon
                icon="mingcute:chat-2-fill"
                className="text-primary size-8"
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Hey there, Chat Explorer!</h2>
        <p className="text-base-content/60">
          Pick a convo on the left to dive in 🗨️
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
