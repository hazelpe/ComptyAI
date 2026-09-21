# ComptyAI 中文介绍

[English README](../../README.md) · [协议文档](../README.md)

![ComptyAI](../../assets/banners/01-hero.png)

**让代币活动转化为算力。持有代币，获得算力。**

ComptyAI 是一个面向 Robinhood Chain 的算力访问协议项目。核心设计是把代币相关活动产生的部分交易费或协议收入，汇入 Compute Treasury（算力金库），用于租赁 AI GPU 算力，再以 Compute Credits（算力额度）的形式提供给符合条件的代币持有者。

```text
代币活动 → 协议收入 → 算力金库 → 租赁 GPU → 持币者获得算力额度
```

## 核心理念

> Turn token activity into compute.
>
> Hold tokens. Get compute.
>
> We don’t accumulate tokens. We accumulate compute.

项目关注的是可使用的计算资源。持币者在已分配的额度内使用算力，无需另外支付对应的算力费用；具体可用量受协议收入、已确认的 GPU 容量、资格规则和有效期限制。链上操作仍可能需要支付 Gas。

## 仓库已经包含什么

仓库提供原始 Logo、4 张 README 横幅、多层项目目录、协议与经济模型文档，以及可以直接运行的本地示例。代码演示预算计算、按权重分配额度、任务预留、实际用量结算、失败释放和到期处理。

当前是**协议设计与参考原型阶段**，未声称已发行代币、部署金库、租用真实 GPU 或上线领取服务。真实费率、代币供应量、合约地址、供应商和上线日期仍需项目方确定。

## 本地运行

安装 Node.js 22 或更新版本，在仓库根目录执行：

```sh
npm run demo
npm test
npm run check
```

无需安装项目依赖，也无需钱包或 API Key。示例使用虚构的 1,000 美元协议收入，将其中 60% 分配给算力金库，再预留金库金额的 10%，剩余 540 美元按示例单价 2 美元/小时计算为 270 GPU 小时，即 16,200 个示例额度。全部数字仅用于说明机制。

## 主要目录

| 目录 | 内容 |
| --- | --- |
| `assets/brand/`、`assets/banners/` | Logo、品牌说明、横幅及 SVG 源文件 |
| `docs/protocol/` | 费用流转、金库、额度和持币资格 |
| `docs/architecture/` | 系统设计、供应商接口和设计决策 |
| `packages/` | 预算分配、额度账本、Robinhood 链配置 |
| `services/scheduler/` | 本地 GPU 模拟器和任务流程 |
| `contracts/src/interfaces/` | Solidity 接口提案，无已部署实现 |
| `examples/`、`tests/` | 示例输入与自动化测试 |

Robinhood Chain 主网链 ID 为 `4663`，测试网为 `46630`，Gas 币为 ETH。网络信息依据 [Robinhood 官方文档](https://docs.robinhood.com/chain/connecting/) 于 2026-09-22 核对。ComptyAI 为独立项目，不代表与 Robinhood 存在官方合作或背书。

下一步见 [路线图](../../ROADMAP.md)，参与开发见 [贡献指南](../../CONTRIBUTING.md)。
