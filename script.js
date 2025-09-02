(function() {
  const CONFIG = {
    fields: [] // сюда загрузим из настроек
  };

  // Функция вставки кнопки
  function addButton(field) {
    if (!field) return;

    // Чтобы не дублировались
    if (field.parentNode.querySelector("button.yamap-btn")) return;

    const btn = document.createElement("button");
    btn.innerText = "🔍";
    btn.className = "yamap-btn";
    btn.style.marginLeft = "6px";
    btn.style.cursor = "pointer";
    btn.style.border = "none";
    btn.style.background = "transparent";
    btn.title = "Открыть в Яндекс.Картах";

    btn.addEventListener("click", () => {
      const value = field.value.trim();
      if (value) {
        const url = `https://yandex.ru/maps/?text=${encodeURIComponent(value)}`;
        window.open(url, "_blank");
      }
    });

    field.parentNode.appendChild(btn);
  }

  // Наблюдатель за DOM
  function initObserver() {
    const observer = new MutationObserver(() => {
      CONFIG.fields.forEach(id => {
        const field = document.querySelector(`[data-id="${id}"] input`);
        if (field) addButton(field);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // API amoCRM
  return {
    init: function() {
      // Получаем настройки из манифеста
      const settings = AMOCRM.widgets.system.area.settings || {};
      if (settings.targetFields) {
        CONFIG.fields = settings.targetFields.split(",").map(f => f.trim());
      }
      initObserver();
      return true;
    },
    bind_actions: function() {
      return true;
    },
    settings: function() {
      return true;
    },
    onSave: function() {
      return true;
    },
    destroy: function() {}
  };
})();
