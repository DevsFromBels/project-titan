import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Task } from "@lit/task";

export type Subscriptions = Subscription[];

export interface Subscription {
  content_id: string;
  content: string;
  name: string;
  link: string;
  user_id: string;
  price_for_show: number;
  total_shows: number;
  current_shows: number;
  category: any;
}

@customElement("show-ads")
export class ShowAds extends LitElement {
  @property() token?: string;
  @property() type?: string;

  static override styles = css`
    .ad-block {
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    const searchParams = new URLSearchParams(window.location.search);
    this.token = searchParams.get("token") || undefined;
    this.type = searchParams.get("type") || undefined;
  }

  private _productTask = new Task(this, {
    task: async ([token], { signal }) => {
      const response = await fetch(
        `https://market-api.titanproject.top/get-user-subscriptions?token=${token}`,
        { signal }
      );
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return (await response.json()) as Subscriptions;
    },
    args: () => [this.token],
  });

  private _currentSubscription: Subscription | null = null;
  private _intervalId: number | null = null;

  override connectedCallback() {
    super.connectedCallback();
    if (this.type === "single") {
      this._startInterval();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

  private async _startInterval() {
    if (this._productTask.value) {
      const subscriptions = this._productTask.value;
      if (subscriptions && subscriptions.length > 0) {
        // Выбираем случайную подписку из списка
        const randomSubscription =
          subscriptions[Math.floor(Math.random() * subscriptions.length)];
        if (randomSubscription) {
          // Обновляем текущую подписку
          this._currentSubscription = randomSubscription;
          // Обновляем тип для отображения одного поста
          this.type = `single/${randomSubscription.content_id}`;
          // Запрашиваем перерисовку компонента
          this.requestUpdate();
        }
      }
    }

    this._intervalId = window.setInterval(async () => {
      if (this._productTask.value) {
        const subscriptions = this._productTask.value;
        if (subscriptions && subscriptions.length > 0) {
          // Выбираем случайную подписку из списка
          const randomSubscription =
            subscriptions[Math.floor(Math.random() * subscriptions.length)];
          if (randomSubscription) {
            // Обновляем текущую подписку
            this._currentSubscription = randomSubscription;
            // Обновляем тип для отображения одного поста
            this.type = `single/${randomSubscription.content_id}`;
            // Запрашиваем перерисовку компонента
            this.requestUpdate();
          }
        }
      }
    }, 2000);
  }

  goToLinkPage(
    user_id: string,
    content_id: string,
    redirect_url: string
  ) {
    window.location.href = `https://titanproject.top/auto-redirect?user=${user_id}&content_id=${content_id}&redirect_url=${redirect_url}`;
  }

  protected override render() {
    if (this.type === "single") {
      return this._productTask.render({
        pending: () => html`Single post loading`,
        complete: () => this._renderSingleSubscription(),
      });
    }

    return this._productTask.render({
      pending: () => html`<p>Loading product...</p>`,
      complete: (product: Subscriptions) => this._renderSubscriptions(product),
      error: (e) => html`<p>Ошибка: ${e}</p>`,
    });
  }

  private _renderSubscriptions(subscriptions: Subscriptions) {
    if (this.type === "full") {
      return html`
        <div style="display: flex; gap: 4px; flex-wrap: wrap;">
          ${subscriptions.map((sub) => this._renderSubscription(sub))}
        </div>
      `;
    } else {
      return html`
        <div
          style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;"
        >
          ${this._currentSubscription
            ? this._renderSubscription(this._currentSubscription)
            : html`<p>Загрузка...</p>`}
        </div>
      `;
    }
  }

  private _renderSubscription(subscription: Subscription) {
    return html`
      <div
        class="ad-block"
        @click="${() =>
          this.goToLinkPage(
            subscription.user_id,
            subscription.content_id,
            subscription.link
          )}"
        style="position: relative; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;"
      >
        <div>
          <img
            src=${`https://market-api.titanproject.top` + subscription.content}
            style="width: 200px; height: 200px; border-radius: 10px;"
            alt=""
          />
        </div>
        <div
          style="position: absolute; border-radius: 2px; width: 100%; display: flex; flex-direction: column; bottom: 0; left: 0; background-color: #00000090;"
        >
          <div style="padding: 10px; border-radius: 10px;">
            <h3>${subscription.name}</h3>
          </div>
        </div>
      </div>
    `;
  }

  private _renderSingleSubscription() {
    if (!this._currentSubscription) {
      return html`<p>Загрузка...</p>`;
    }

    return html`
      <div
        style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;"
      >
        <div>
          <img
            src=${`https://market-api.titanproject.top` +
            (this._currentSubscription.content || "")}
            style="width: 200px; height: 200px;"
            alt=""
          />
        </div>
        <div style="position: absolute;">
          <h3>${this._currentSubscription.name}</h3>
          <p>${this._currentSubscription.content_id}</p>
        </div>
      </div>
    `;
  }
}
