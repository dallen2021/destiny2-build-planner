      /* ---------------- CONSTANTS (unchanged artifact + bonus objects) ------------- */
      const artifactMods = [
        [
          {
            type: "Champion Mod",
            name: "Anti-Barrier Scout and Pulse",
            description:
              "Your equipped Scout Rifles and Pulse Rifles fire shield-piercing rounds and stun Barrier Champions",
            elements: [],
          },
          {
            type: "Champion Mod",
            name: "Unstoppable Sidearm and Hand Cannon",
            description:
              "Aiming down the sights of a Hand Cannon or Sidearm for a short time loads a powerful payload that stuns unshielded combatants. Strong against Unstoppable champions",
            elements: [],
          },
          {
            type: "Champion Mod",
            name: "Unstoppable Sniper Rifle",
            description:
              "Aiming down the sights of a Sniper Rifle for a short time loads a powerful payload that stuns unshielded combatants. Strong against Unstoppable champions",
            elements: [],
          },
          {
            type: "Champion Mod",
            name: "Overload Shotgun",
            description:
              "Your equipped shotguns fire disrupting rounds which stun the target, delaying ability regeneration and lowering combatant damage output. Strong against Overload champions",
            elements: [],
          },
          {
            type: "Champion Mod",
            name: "Overload Rapid Fire",
            description:
              "Uninterrupted fire from your equipped Auto Rifles and Submachine Guns grants bullets that stun combatants, delaying ability regeneration and lowering combatant damage output",
            elements: [],
          },
        ],
        [
          {
            type: "Elemental Mod",
            name: "Flame, Fiber, and Freeze",
            description:
              "Combines the Solar/Strand and Solar/Stasis siphon mods into one",
            elements: ["solar", "strand", "stasis"],
          },
          {
            type: "Economy Mod",
            name: "Diviner's Discount",
            description: "All Scavenger mods are discounted",
            elements: [],
          },
          {
            type: "Armor Mod",
            name: "One With Frost",
            description:
              "While Frost Armor is active, Stasis weapons gain increased reload speed and stability. Stasis Swords gain increased guard resistance",
            elements: ["stasis"],
          },
          {
            type: "Armor Mod",
            name: "Tightly Woven",
            description:
              "While Woven Mail is active, gain increased Super and Grenade stats",
            elements: ["strand"],
          },
          {
            type: "Weapon Mod",
            name: "Rapid Precision Rifling",
            description:
              "Rapid precision hits or final blows with Scout Rifles grant them increased reload and reduced incoming flinch",
            elements: [],
          },
        ],
        [
          {
            type: "Combat Mod",
            name: "Fever and Chill",
            description:
              "Rapid Precision hits with Solar weapons grant Radiant. Rapid precision hits with Stasis weapons grant Frost Armor",
            elements: ["solar", "stasis"],
          },
          {
            type: "Support Mod",
            name: "Elemental Benevolence",
            description:
              "Granting allies an elemental buff gives Class ability energy",
            elements: ["solar", "arc", "void", "stasis", "strand"],
          },
          {
            type: "Armor Mod",
            name: "Frost Renewal",
            description:
              "While you have Frost Armor, taking critical damage releases a burst that freezes nearby combatants and grants Frost Armor to you and nearby allies",
            elements: ["stasis"],
          },
          {
            type: "Weapon Mod",
            name: "Reciprocal Draw",
            description:
              "Rapid non-Sidearm final blows grant Sidearms a period of increased damage for a short time upon next draw",
            elements: [],
          },
          {
            type: "Ability Mod",
            name: "Refresh Threads",
            description:
              "Picking up an elemental pickup matching your subclass element or Tangle while you have a Strand Super grants energy to your least charged ability",
            elements: ["strand"],
          },
        ],
        [
          {
            type: "Damage Mod",
            name: "Threaded Blast",
            description:
              "Destroying a Tangle with Strand damage increases the radius of the explosion and its damage",
            elements: ["strand"],
          },
          {
            type: "Elemental Mod",
            name: "Cauterized Darkness",
            description:
              "Stasis or Strand debuffed non-boss combatants take increased Solar damage from all sources",
            elements: ["solar", "stasis", "strand"],
          },
          {
            type: "Champion Mod",
            name: "Elemental Daze",
            description:
              "Stunning a Champion with an elemental weapon creates an elementally aligned explosion, applying a matching elemental debuff to them and nearby targets",
            elements: ["solar", "arc", "void", "stasis", "strand"],
          },
          {
            type: "Support Mod",
            name: "Shoulder to Shoulder",
            description:
              "Dealing sustained precision damage against combatants while near two or more allies grants you damage resistance",
            elements: [],
          },
          {
            type: "Elemental Mod",
            name: "Elemental Coalescence",
            description:
              "Defeating targets has the chance to create an elemental pickup matching your equipped Super element",
            elements: ["solar", "arc", "void", "stasis", "strand"],
          },
        ],
        [
          {
            type: "Ultimate Mod",
            name: "Radiant Shrapnel",
            description:
              "Dealing sustained weapon damage while Radiant or defeating a scorched combatant with a weapon causes the target to release Solar projectiles that deal damage and scorch on impact",
            elements: ["solar"],
          },
          {
            type: "Ultimate Mod",
            name: "Shieldcrush",
            description:
              "While you have Woven Mail, Frost Armor, or a Void overshield, your melee recharges faster and deals increased damage. While you are Amplified or Radiant, your grenade recharges faster and deals increased damage",
            elements: ["strand", "stasis", "void", "arc", "solar"],
          },
          {
            type: "Ultimate Mod",
            name: "Elemental Overdrive",
            description:
              "Picking up an elemental pickup or Tangle grants increased damage to weapons of the same element",
            elements: ["solar", "arc", "void", "stasis", "strand"],
          },
          {
            type: "Ultimate Mod",
            name: "Tangled Web",
            description:
              "Creating a Tangle by defeating a Strand debuffed target suspends nearby combatants",
            elements: ["strand"],
          },
          {
            type: "Ultimate Mod",
            name: "Frigid Glare",
            description:
              "While Frost Armor is active, Stasis precision final blows cause combatants to release a freezing burst",
            elements: ["stasis"],
          },
        ],
      ];

      const statsArr = [
        "Weapons",
        "Health",
        "Class",
        "Grenade",
        "Super",
        "Melee",
      ];
      const statBonusData = {
        weapons: {
          reload_handling_speed: { 10: 1, 50: 5, 100: 10, 150: 10, 200: 10 },
          minor_major_damage: { 10: 1.5, 50: 7.5, 100: 15, 150: 15, 200: 15 },
          additional_ammo_chance: { 150: 49, 200: 100 },
          primary_special_boss_damage: { 100: 0, 200: 15 },
          primary_special_guardian_damage: { 100: 0, 200: 6 },
          heavy_boss_damage: { 100: 0, 200: 10 },
          heavy_guardian_damage: { 100: 0, 200: 6 },
        },
        health: {
          health_per_orb: { 10: 7, 50: 35, 100: 70, 150: 70, 200: 70 },
          flinch_resistance: { 10: 1, 50: 5, 100: 10, 150: 10, 200: 10 },
          shield_recharge_rate: { 100: 0, 200: 45 },
          shield_health: { 100: 0, 200: 20 },
        },
        class: {
          cooldown: { 10: -7, 50: -35, 100: -65, 150: -65, 200: -65 },
          energy_gained: { 10: 14, 50: 56, 100: 190, 150: 190, 200: 190 },
          overshield_health: { 100: 0, 200: 40 },
        },
        grenade: {
          cooldown: { 10: -7, 50: -35, 100: -65, 150: -65, 200: -65 },
          energy_gained: { 10: 14, 50: 56, 100: 190, 150: 190, 200: 190 },
          damage_increase_pve: { 100: 0, 200: 65 },
          damage_increase_pvp: { 100: 0, 200: 20 },
        },
        super: {
          energy_gained: { 10: 14, 50: 56, 100: 190, 150: 190, 200: 190 },
          damage_increase_pve: { 100: 0, 200: 45 },
          damage_increase_pvp: { 100: 0, 200: 15 },
        },
        melee: {
          cooldown: { 10: -7, 50: -35, 100: -65, 150: -65, 200: -65 },
          energy_gained: { 10: 14, 50: 56, 100: 190, 150: 190, 200: 190 },
          damage_increase_pve: { 100: 0, 200: 30 },
          damage_increase_pvp: { 100: 0, 200: 20 },
        },
      };

      /* Define exotic class item combinations for each class */
      const exoticClassItemCombinations = {
        hunter: {
          column1: ["assassinsCowl", "caliban"],
          column2: ["liarsHandshake", "synthocepsHunter"],
        },
        titan: {
          column1: ["severanceEnclosure"],
          column2: ["synthocepsTitan"],
        },
        warlock: {
          column1: ["necroticGrip"],
          column2: ["synthocepsWarlock"],
        },
      };

      /* ------------------- GLOBAL STATE ------------------- */
      // Inventory/Auth State
      let isAuthenticated = false;
      let selectedInventoryItems = {};
      let inventoryData = [];

      // Artifact State
      let selectedMods = new Set();
      let columnCounts = [0, 0, 0, 0, 0];
      let activeElementFilters = new Set();

      // Damage Calc State
      let currentClass = "hunter";
      let selectedExotics = new Set();
      window.calculatedStatBonuses = {};
      const state = {
        statValues: {
          Weapons: 10,
          Health: 10,
          Class: 10,
          Melee: 10,
          Grenade: 10,
          Super: 10,
        },
      };

      // Loadout State
      let savedLoadouts = [];

      window.addEventListener("DOMContentLoaded", async () => {
        await initializeApp();
        initializeArtifact();
        initStatAllocator();
        updateAllStatCalculations();
        const savedClass = localStorage.getItem("d2SelectedClass") || "hunter";
        selectClass(savedClass);
        loadSavedLoadouts();

        // Add event listener for instance component
        const instanceCheckbox = document.getElementById("includeInstances");
        if (instanceCheckbox) {
          instanceCheckbox.addEventListener("change", (e) => {
            if (e.target.checked && inventoryData.length > 0) {
              loadInventory();
            }
          });
        }
      });

      /* -------- AUTH & INVENTORY FUNCTIONS -------- */
      async function initializeApp() {
        try {
          await checkAuth();
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get("auth") === "success") {
            showNotification(
              "Successfully connected to Bungie.net!",
              "success"
            );
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
            await checkAuth();
            await loadInventory();
          } else if (urlParams.get("auth") === "error") {
            showNotification("Failed to connect to Bungie.net", "error");
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
          }
        } catch (error) {
          console.error("Initialization error:", error);
          showNotification("Failed to initialize application", "error");
        } finally {
          showLoading(false);
        }
      }

      async function checkAuth() {
        try {
          const status = await window.d2Api.checkAuthStatus();
          isAuthenticated = status.authenticated;
          updateAuthUI();
        } catch (error) {
          console.error("Auth check failed:", error);
          isAuthenticated = false;
          updateAuthUI();
        }
      }

      function updateAuthUI() {
        const authButton = document.getElementById("authButton");
        const userInfo = document.getElementById("userInfo");
        const userName = document.getElementById("userName");

        if (isAuthenticated && window.d2Api.destinyMembership) {
          authButton.textContent = "Disconnect";
          userInfo.style.display = "flex";
          userName.textContent =
            window.d2Api.destinyMembership.displayName || "Guardian";
        } else {
          authButton.textContent = "Connect to Bungie.net";
          userInfo.style.display = "none";
        }
      }

      async function handleAuth() {
        if (isAuthenticated) {
          try {
            await window.d2Api.logout();
            showNotification("Disconnected from Bungie.net", "info");
            await checkAuth();
            inventoryData = [];
            selectedInventoryItems = {};
            updateArmorDisplay();
          } catch (error) {
            console.error("Logout error:", error);
            showNotification("Failed to disconnect", "error");
          }
        } else {
          window.d2Api.login();
        }
      }

      async function loadInventory() {
        if (!isAuthenticated) {
          showNotification("Please connect to Bungie.net first", "info");
          return;
        }
        showLoading(true);
        try {
          const response = await window.d2Api.getInventory();
          let armorItems = [];

          // Get vault armor
          if (response.profileInventory?.data?.items) {
            const vaultArmor = response.profileInventory.data.items.filter(
              (item) => isArmorItem(item)
            );
            vaultArmor.forEach((item) => {
              item.location = "vault";
              item.stats =
                response.itemComponents?.stats?.data?.[item.itemInstanceId];
              item.sockets =
                response.itemComponents?.sockets?.data?.[item.itemInstanceId];
              item.instance =
                response.itemComponents?.instances?.data?.[item.itemInstanceId];
              armorItems.push(item);
            });
          }

          // Get character armor
          if (response.characterInventories?.data) {
            for (const [characterId, inventory] of Object.entries(
              response.characterInventories.data
            )) {
              const charArmor = inventory.items.filter((item) =>
                isArmorItem(item)
              );
              charArmor.forEach((item) => {
                item.location = characterId;
                item.stats =
                  response.itemComponents?.stats?.data?.[item.itemInstanceId];
                item.sockets =
                  response.itemComponents?.sockets?.data?.[item.itemInstanceId];
                item.instance =
                  response.itemComponents?.instances?.data?.[
                    item.itemInstanceId
                  ];
                armorItems.push(item);
              });
            }
          }

          inventoryData = await window.d2Api.processInventoryItems(armorItems);

          updateArmorDisplay();
          updateExoticOptions();
          showNotification(
            `Loaded ${inventoryData.length} armor pieces`,
            "success"
          );
        } catch (error) {
          console.error("Failed to load inventory:", error);
          showNotification(
            "Failed to load inventory: " + error.message,
            "error"
          );
        } finally {
          showLoading(false);
        }
      }

      function isArmorItem(item) {
        const armorBuckets = [
          3448274439, // Helmet
          3551918588, // Gauntlets
          14239492, // Chest
          20886954, // Legs
          1585787867, // Class item
        ];
        return armorBuckets.includes(item.bucketHash);
      }

      function updateArmorDisplay() {
        const container = document.getElementById("armorContainer");
        if (!container) return;

        if (!isAuthenticated) {
          container.innerHTML =
            '<div class="empty-state">Connect to Bungie.net to load your armor collection</div>';
          return;
        }

        if (inventoryData.length === 0) {
          container.innerHTML =
            '<div class="empty-state">No armor found. Try refreshing your inventory.</div>';
          return;
        }

        const filtered = filterArmor();

        const bucketOrder = {
          3448274439: 0,
          3551918588: 1,
          14239492: 2,
          20886954: 3,
          1585787867: 4,
        };

        filtered.sort((a, b) => {
          if (a.isExotic !== b.isExotic) return a.isExotic ? -1 : 1;
          const orderA = bucketOrder[a.bucketHash] ?? 5;
          const orderB = bucketOrder[b.bucketHash] ?? 5;
          if (orderA !== orderB) return orderA - orderB;
          return b.powerLevel - a.powerLevel;
        });

        container.innerHTML = filtered
          .map((item) => {
            const tierClass = item.isExotic ? "exotic" : "legendary";
            const masterworkClass = item.isMasterworked ? "masterworked" : "";
            const statNames = {
              mobility: "MOBILITY",
              resilience: "RESILIENCE",
              recovery: "RECOVERY",
              discipline: "DISCIPLINE",
              intellect: "INTELLECT",
              strength: "STRENGTH",
            };

            // Order stats correctly
            const statOrder = [
              "mobility",
              "resilience",
              "recovery",
              "discipline",
              "intellect",
              "strength",
            ];
            const orderedStats = {};
            statOrder.forEach((stat) => {
              if (item.stats && item.stats[stat] !== undefined) {
                orderedStats[stat] = item.stats[stat];
              }
            });

            return `
                <div class="armor-item ${tierClass} ${masterworkClass} ${
                  selectedInventoryItems[item.itemInstanceId] ? "selected" : ""
                }" 
                     onclick="toggleInventoryItem('${item.itemInstanceId}')"
                     data-instance-id="${item.itemInstanceId}">
                    <div class="armor-header">
                        <div class="armor-icon ${masterworkClass}">
                            ${item.icon ? `<img src="${item.icon}" alt="${item.displayName}" />` : ""}
                        </div>
                        <div class="armor-info">
                            <div class="armor-name">${item.displayName}</div>
                            <div class="armor-type">${item.itemType} ${
                              item.location === "vault" ? "(Vault)" : ""
                            }</div>
                        </div>
                        <div class="armor-power">${item.powerLevel || 0}</div>
                    </div>
                    <div class="armor-stats">
                        ${Object.entries(orderedStats)
                          .map(
                            ([stat, value]) => `
                                <div class="stat-item">
                                    <div class="stat-name">${statNames[stat] || stat.toUpperCase()}</div>
                                    <div class="stat-value">${value}</div>
                                </div>
                            `
                          )
                          .join("")}
                    </div>
                    <div class="armor-tags">
                        ${item.isArtifice ? '<div class="armor-tag artifice">⬢ Artifice</div>' : ""}
                        ${item.isExotic ? '<div class="armor-tag exotic">★ Exotic</div>' : ""}
                        ${item.isMasterworked ? '<div class="armor-tag">✦ Masterworked</div>' : ""}
                    </div>
                </div>
              `;
          })
          .join("");
      }

      function filterArmor() {
        const typeFilter =
          document.getElementById("armorTypeFilter")?.value || "all";
        const tierFilter =
          document.getElementById("armorTierFilter")?.value || "all";
        const classMap = { titan: 0, hunter: 1, warlock: 2 };
        const classId = classMap[currentClass];

        return inventoryData.filter((item) => {
          if (
            item.classType !== undefined &&
            item.classType !== 3 &&
            item.classType !== classId
          ) {
            return false;
          }
          // Type filter
          if (typeFilter !== "all") {
            const bucketToType = {
              3448274439: "helmet",
              3551918588: "gauntlets",
              14239492: "chest",
              20886954: "legs",
              1585787867: "classItem",
            };
            if (bucketToType[item.bucketHash] !== typeFilter) return false;
          }

          // Tier filter
          if (tierFilter !== "all") {
            if (tierFilter === "exotic" && !item.isExotic) return false;
            if (tierFilter === "legendary" && item.isExotic) return false;
          }

          return true;
        });
      }

      function toggleInventoryItem(instanceId) {
        const item = inventoryData.find(
          (item) => item.itemInstanceId === instanceId
        );
        if (!item) return;

        if (selectedInventoryItems[instanceId]) {
          delete selectedInventoryItems[instanceId];
        } else {
          // Check if this is exotic and we already have an exotic selected
          const bucketToType = {
            3448274439: "helmet",
            3551918588: "gauntlets",
            14239492: "chest",
            20886954: "legs",
            1585787867: "classItem",
          };
          const itemType = bucketToType[item.bucketHash];

          // Remove any existing item of the same type
          Object.keys(selectedInventoryItems).forEach((id) => {
            const existingItem = selectedInventoryItems[id];
            if (bucketToType[existingItem.bucketHash] === itemType) {
              delete selectedInventoryItems[id];
            }
          });

          selectedInventoryItems[instanceId] = item;
        }

        updateArmorDisplay();
        updateBuildSummary();
      }

      function updateBuildSummary() {
        // Calculate total stats from selected armor
        const statTotals = {
          mobility: 0,
          resilience: 0,
          recovery: 0,
          discipline: 0,
          intellect: 0,
          strength: 0,
        };

        Object.values(selectedInventoryItems).forEach((item) => {
          if (item.stats) {
            Object.entries(item.stats).forEach(([stat, value]) => {
              if (statTotals.hasOwnProperty(stat)) {
                statTotals[stat] += value;
              }
            });
          }
        });

        // Update display
        Object.entries(statTotals).forEach(([stat, total]) => {
          const capitalizedStat = stat.charAt(0).toUpperCase() + stat.slice(1);
          const element = document.getElementById(`total${capitalizedStat}`);
          if (element) {
            element.textContent = total;
            const tier = Math.floor(Math.min(total, 100) / 10);
            const tierElement =
              element.parentElement.querySelector(".stat-tier");
            if (tierElement) {
              tierElement.textContent = `Tier ${tier}`;
            }
          }
        });
      }

      /* -------- GENERAL UI FUNCTIONS -------- */
      function switchTab(tabName) {
        document
          .querySelectorAll(".nav-tab")
          .forEach((tab) => tab.classList.remove("active"));
        document
          .querySelectorAll(".content-section")
          .forEach((section) => section.classList.remove("active"));
        event.currentTarget.classList.add("active");
        document.getElementById(tabName).classList.add("active");
      }

      function showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.remove();
        }, 5000);
      }

      function showLoading(show) {
        const overlay = document.getElementById("loadingOverlay");
        if (overlay) {
          overlay.style.display = show ? "flex" : "none";
        }
      }

      /* ---------------- Stat allocator via BOXES ---------------- */
      function initStatAllocator() {
        const alloc = document.getElementById("statAllocator");
        statsArr.forEach((stat) => {
          const row = document.createElement("div");
          row.className = "stat-row";
          row.innerHTML = `<label>${stat}</label><div id="${stat.toLowerCase()}Row" class="stat-row-data"></div>`;
          alloc.appendChild(row);
          buildStatBoxes(stat);
        });
      }

      function buildStatBoxes(stat) {
        const wrapper = document.createElement("div");
        wrapper.className = "stat-box-wrapper";
        for (let val = 10; val <= 200; val += 10) {
          const box = document.createElement("div");
          box.className = "stat-box";
          box.dataset.stat = stat;
          box.dataset.value = val;
          box.textContent = val;
          box.addEventListener("click", onStatBoxClick);
          wrapper.appendChild(box);
        }
        document
          .getElementById(stat.toLowerCase() + "Row")
          .appendChild(wrapper);
        const bonusDiv = document.createElement("div");
        bonusDiv.className = "stat-bonuses";
        bonusDiv.id = `${stat.toLowerCase()}Bonuses`;
        document
          .getElementById(stat.toLowerCase() + "Row")
          .appendChild(bonusDiv);
      }

      function onStatBoxClick(e) {
        const stat = e.currentTarget.dataset.stat;
        const val = Number(e.currentTarget.dataset.value);
        state.statValues[stat] = val;
        updateAllStatCalculations();
      }

      /* ----------- Calculation & UI refresh ----------- */
      function updateAllStatCalculations() {
        const allocated = Object.values(state.statValues).reduce(
          (a, b) => a + b,
          0
        );

        const summary = document.getElementById("statPointSummary");
        if (summary) {
          summary.textContent = `Total Points: ${allocated}`;
        }

        statsArr.forEach((stat) => {
          const cur = state.statValues[stat];
          document
            .querySelectorAll(`.stat-box[data-stat='${stat}']`)
            .forEach((box) => {
              const value = Number(box.dataset.value);
              box.classList.toggle("selected", value === cur);
              box.classList.remove("disabled");
            });
        });

        applyStatBonuses();
        findOptimalBuilds();
      }

      function interpolate(points, x) {
        const ks = Object.keys(points)
          .map(Number)
          .sort((a, b) => a - b);
        let lower = ks[0];
        for (const k of ks) {
          if (x >= k) lower = k;
          else break;
        }
        if (x < ks[0]) return 0;
        const upper = ks[ks.indexOf(lower) + 1];
        if (upper == undefined) return points[lower] || 0;
        const v1 = points[lower] || 0,
          v2 = points[upper] || 0;
        return v1 + ((v2 - v1) * (x - lower)) / (upper - lower);
      }

      function applyStatBonuses() {
        window.calculatedStatBonuses = {};
        statsArr.forEach((stat) => {
          const val = state.statValues[stat];
          const bonuses = statBonusData[stat.toLowerCase()];
          const display = document.getElementById(
            `${stat.toLowerCase()}Bonuses`
          );
          let parts = [];
          window.calculatedStatBonuses[stat.toLowerCase()] = {};
          for (const [k, pts] of Object.entries(bonuses)) {
            const num = interpolate(pts, val);
            if (num !== 0) {
              const text = k
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());
              parts.push(
                `${text}: <span style='color:#8af295;'>${
                  num > 0 ? "+" : ""
                }${num.toFixed(1)}%</span>`
              );
              window.calculatedStatBonuses[stat.toLowerCase()][k] = num / 100;
            }
          }
          display.innerHTML = parts.join(" | ");
        });

        updateTheoreticalBuffState();
        recalculateAllDamage();
      }

      function updateTheoreticalBuffState() {
        const superStat = state.statValues.Super;
        const container = document.getElementById(
          "theoreticalWellBuffContainer"
        );
        const checkbox = document.getElementById("theoreticalWellBuff");

        if (superStat >= 110) {
          container.classList.remove("disabled");
          checkbox.disabled = false;
        } else {
          container.classList.add("disabled");
          checkbox.disabled = true;
          checkbox.checked = false;
        }
      }

      /* ---- ARTIFACT / DAMAGE / CLASS functions ---- */
      function initializeArtifact() {
        const t = document.getElementById("columnsWrapper");
        (t.innerHTML = ""),
          artifactMods.forEach((e, n) => {
            const o = document.createElement("div");
            o.className = "column";
            const l = document.createElement("div");
            (l.className = "column-header"),
              (l.textContent = `Column ${n + 1}`),
              o.appendChild(l),
              e.forEach((e, l) => {
                o.appendChild(createModCard(e, n, l));
              }),
              t.appendChild(o);
          }),
          document
            .getElementById("artifactFilters")
            .addEventListener("click", (t) => {
              if (t.target.classList.contains("element-filter-btn")) {
                const e = t.target.dataset.element;
                t.target.classList.toggle("active"),
                  activeElementFilters.has(e)
                    ? activeElementFilters.delete(e)
                    : activeElementFilters.add(e),
                  applyArtifactFilters();
              }
            }),
          updateUI();
      }

      function createModCard(t, e, n) {
        const o = document.createElement("div");
        (o.className = "mod-card"),
          (o.dataset.column = e),
          (o.dataset.index = n);
        const l = document.createElement("div");
        (l.className = "mod-type"), (l.textContent = t.type);
        const d = document.createElement("div");
        (d.className = "mod-name"), (d.textContent = t.name);
        const a = document.createElement("div");
        return (
          (a.className = "mod-description"),
          (a.textContent = t.description),
          o.appendChild(l),
          o.appendChild(d),
          o.appendChild(a),
          o.addEventListener("click", () => toggleMod(`${e}-${n}`, e)),
          o
        );
      }

      function applyArtifactFilters() {
        const t = document.querySelectorAll(".mod-card");
        if (0 === activeElementFilters.size)
          return void t.forEach((t) =>
            t.classList.remove("highlighted", "dimmed")
          );
        t.forEach((t) => {
          const e = artifactMods[t.dataset.column][
            t.dataset.index
          ].elements.some((t) => activeElementFilters.has(t));
          t.classList.toggle("highlighted", e),
            t.classList.toggle("dimmed", !e);
        });
      }

      function toggleMod(t, e) {
        const n = document.querySelector(
          `[data-column='${e}'][data-index='${t.split("-")[1]}']`
        );
        n.classList.contains("locked") ||
          (selectedMods.has(t)
            ? (selectedMods.delete(t), columnCounts[e]--)
            : selectedMods.size >= 12
              ? alert("Maximum 12 mods can be selected!")
              : 4 === e && columnCounts[4] >= 2
                ? alert("Maximum 2 mods can be selected in Column 5!")
                : (selectedMods.add(t), columnCounts[e]++),
          updateUI(),
          updateArtifactBuffs());
      }

      function updateUI() {
        (document.getElementById("modCount").textContent = selectedMods.size),
          document.querySelectorAll(".mod-card").forEach((t) => {
            const e = parseInt(t.dataset.column),
              n = parseInt(t.dataset.index),
              o = `${e}-${n}`;
            t.classList.remove("selected", "locked"),
              selectedMods.has(o) && t.classList.add("selected"),
              isColumnLocked(e) && t.classList.add("locked");
          });
      }

      function isColumnLocked(t) {
        const e = selectedMods.size;
        switch (t) {
          case 1:
            return columnCounts[0] < 3;
          case 2:
            return e < 5;
          case 3:
            return e < 8;
          case 4:
            return e < 10;
          default:
            return !1;
        }
      }

      function resetSelection() {
        selectedMods.clear(),
          (columnCounts = [0, 0, 0, 0, 0]),
          updateUI(),
          updateArtifactBuffs();
      }

      function updateArtifactBuffs() {
        (document.getElementById("elementalOverdrive").checked =
          selectedMods.has("4-2")),
          (document.getElementById("radiantShrapnel").checked =
            selectedMods.has("4-0")),
          recalculateAllDamage();
      }

      function recalculateAllDamage() {
        calculateWeaponDamage(),
          calculateMeleeDamage(),
          calculateGrenadeDamage(),
          calculateSuperDamage();
      }

      function calculateWeaponDamage() {
        let t = 1,
          e = [];
        const n = window.calculatedStatBonuses.weapons || {};

        // Stat Bonus Damage
        n.heavy_boss_damage &&
          ((t *= 1 + n.heavy_boss_damage), e.push("Heavy Boss Dmg"));

        // Global Stacking Buffs
        document.getElementById("newGearWeapon").checked &&
          ((t *= 1.1), e.push("New Gear (Art.)"));

        const theoreticalBuffCheckbox = document.getElementById(
          "theoreticalWellBuff"
        );
        if (
          theoreticalBuffCheckbox.checked &&
          !theoreticalBuffCheckbox.disabled
        ) {
          t *= 1.15;
          e.push("Theo. Well User");
        }

        // Empowering Buffs (Highest Applies)
        let o = { value: 1 };
        [
          { id: "radiant", value: 1.25, name: "Radiant" },
          { id: "wellOfRadiance", value: 1.25, name: "Well" },
          { id: "nobleRounds", value: 1.35, name: "Noble Rds" },
        ].forEach((t) => {
          document.getElementById(t.id).checked && t.value > o.value && (o = t);
        });
        o.value > 1 && ((t *= o.value), e.push(o.name));

        // Weapon Damage Buffs (Highest Applies)
        let l = { value: 1 };
        [{ id: "weaponSurge3x", value: 1.22, name: "Surge x3" }].forEach(
          (t) => {
            document.getElementById(t.id).checked &&
              t.value > l.value &&
              (l = t);
          }
        );
        l.value > 1 && ((t *= l.value), e.push(l.name));

        // Weapon Perks (All Stack Multiplicatively)
        [
          { id: "elementalOverdrive", value: 1.25, name: "Overdrive" },
          { id: "killClip", value: 1.25, name: "Kill Clip" },
          { id: "vorpalWeapon", value: 1.15, name: "Vorpal" },
          { id: "frenzy", value: 1.15, name: "Frenzy" },
          { id: "baitSwitch", value: 1.3, name: "B&S" },
          { id: "radiantShrapnel", value: 1.15, name: "Shrapnel" },
        ].forEach((n) => {
          document.getElementById(n.id).checked &&
            ((t *= n.value), e.push(n.name));
        });

        // Debuffs (Highest Applies)
        let d = { value: 1 };
        [
          { id: "weakenDebuff", value: 1.15, name: "Weaken" },
          { id: "tetherDebuff", value: 1.3, name: "Tether" },
          { id: "divinityDebuff", value: 1.15, name: "Divinity" },
          { id: "tractorCannon", value: 1.3, name: "Tractor" },
        ].forEach((t) => {
          document.getElementById(t.id).checked && t.value > d.value && (d = t);
        });
        d.value > 1 && ((t *= d.value), e.push(d.name));

        // Update UI
        (document.getElementById("weaponDamageResult").textContent =
          Math.round(100 * (t - 1) + 100) + "%"),
          (document.getElementById("weaponBreakdown").textContent =
            e.length > 0 ? "Active: " + e.join(" + ") : "Base damage");
      }

      function calculateMeleeDamage() {
        let t = 0,
          e = [];
        const n = {
          onetwoPunch: { v: 300, n: "1-2 Punch" },
          roaringFlames: { v: 200, n: "Roaring Flames" },
          bannerOfWar: { v: 100, n: "Banner" },
          combinationBlow: { v: 165, n: "Combo Blow" },
          liarsHandshake: { v: 400, n: "Liar's" },
          assassinsCowl: { v: 150, n: "Assassin's" },
          caliban: { v: 100, n: "Caliban's" },
          synthocepsHunter: { v: 400, n: "Syntho (CI)" },
          synthocepsTitan: { v: 400, n: "Syntho" },
          wormgodCaress: { v: 400, n: "Wormgod" },
          severanceEnclosure: { v: 200, n: "Severance" },
          wintersGuile: { v: 400, n: "Winter's" },
          necroticGrip: { v: 100, n: "Necrotic" },
          synthocepsWarlock: { v: 400, n: "Syntho (CI)" },
        };
        window.calculatedStatBonuses.melee &&
          window.calculatedStatBonuses.melee.damage_increase_pve &&
          ((t += 100 * window.calculatedStatBonuses.melee.damage_increase_pve),
          e.push("Stat Bonus"));
        for (const o in n) {
          const l = document.getElementById(o);
          l && l.checked && !l.disabled && ((t += n[o].v), e.push(n[o].n));
        }
        (document.getElementById("meleeDamageResult").textContent =
          (100 + t).toFixed(0) + "%"),
          (document.getElementById("meleeBreakdown").textContent = e.length
            ? "Active: " + e.join(" + ")
            : "Base damage (additive)");
      }

      function calculateGrenadeDamage() {
        let t = 1,
          e = [];
        window.calculatedStatBonuses.grenade &&
          window.calculatedStatBonuses.grenade.damage_increase_pve &&
          ((t *= 1 + window.calculatedStatBonuses.grenade.damage_increase_pve),
          e.push("Stat Bonus")),
          (document.getElementById("grenadeDamageResult").textContent =
            Math.round(100 * t) + "%"),
          (document.getElementById("grenadeBreakdown").textContent = e.length
            ? "Active: " + e.join(" + ")
            : "Base damage");
      }

      function calculateSuperDamage() {
        let t = 1,
          e = [];
        window.calculatedStatBonuses.super &&
          window.calculatedStatBonuses.super.damage_increase_pve &&
          ((t *= 1 + window.calculatedStatBonuses.super.damage_increase_pve),
          e.push("Stat Bonus")),
          (document.getElementById("superDamageResult").textContent =
            Math.round(100 * t) + "%"),
          (document.getElementById("superBreakdown").textContent = e.length
            ? "Active: " + e.join(" + ")
            : "Base damage");
      }

      function selectClass(t) {
        currentClass = t;
        localStorage.setItem("d2SelectedClass", t);
        document
          .querySelectorAll(".class-button")
          .forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll(`.class-button[data-class='${t}']`)
          .forEach((b) => b.classList.add("active"));
        document
          .querySelectorAll(".exotic-group")
          .forEach((el) => (el.style.display = "none"));
        const group = document.querySelector("." + t + "-exotics");
        if (group) group.style.display = "block";
        selectedExotics.clear();
        document.querySelectorAll(".exotic-checkbox").forEach((c) => {
          c.checked = false;
        });
        updateExoticRestrictions();
        updateMeleeClassRestrictions();
        updateExoticOptions();
        updateArmorDisplay();
        findOptimalBuilds();
      }

      function handleExoticSelection(t) {
        const e = document.getElementById(t);
        e.checked ? selectedExotics.add(t) : selectedExotics.delete(t),
          updateExoticRestrictions();
      }

      function updateExoticRestrictions() {
        const isClassItem = document.getElementById("exoticClassItem").checked;

        // Reset all disabled states
        document.querySelectorAll(".buff-item[data-exotic]").forEach((item) => {
          item.classList.remove("disabled");
        });

        if (isClassItem) {
          // Disable column 0 items
          document.querySelectorAll('[data-column="0"]').forEach((item) => {
            item.classList.add("disabled");
            const checkbox = item.querySelector("input");
            if (checkbox && checkbox.checked) {
              checkbox.checked = false;
              selectedExotics.delete(checkbox.id);
            }
          });

          // Get class item combinations for current class
          const combos = exoticClassItemCombinations[currentClass];

          // Check column 1 selections
          const selectedColumn1 = [...selectedExotics].filter((id) =>
            combos.column1.includes(id)
          );

          // Check column 2 selections
          const selectedColumn2 = [...selectedExotics].filter((id) =>
            combos.column2.includes(id)
          );

          // If one from column 1 is selected, disable others from column 1
          if (selectedColumn1.length > 0) {
            combos.column1.forEach((exoticId) => {
              if (!selectedColumn1.includes(exoticId)) {
                const item = document.querySelector(
                  `[data-exotic="${exoticId}"]`
                );
                if (item) item.classList.add("disabled");
              }
            });
          }

          // If one from column 2 is selected, disable others from column 2
          if (selectedColumn2.length > 0) {
            combos.column2.forEach((exoticId) => {
              if (!selectedColumn2.includes(exoticId)) {
                const item = document.querySelector(
                  `[data-exotic="${exoticId}"]`
                );
                if (item) item.classList.add("disabled");
              }
            });
          }

          // If 2 exotics are selected (one from each column), disable all others
          if (selectedExotics.size >= 2) {
            document
              .querySelectorAll(
                '.buff-item[data-exotic]:not([data-column="0"])'
              )
              .forEach((item) => {
                const checkbox = item.querySelector(".exotic-checkbox");
                if (checkbox && !checkbox.checked) {
                  item.classList.add("disabled");
                }
              });
          }
        } else {
          // Regular exotic armor rules - only one exotic allowed
          if (selectedExotics.size >= 1) {
            document
              .querySelectorAll(".buff-item[data-exotic]")
              .forEach((item) => {
                const checkbox = item.querySelector(".exotic-checkbox");
                if (checkbox && !checkbox.checked) {
                  item.classList.add("disabled");
                }
              });
          }
        }

        recalculateAllDamage();
      }

      function updateMeleeClassRestrictions() {
        document.querySelectorAll("[data-melee-classes]").forEach((t) => {
          const e = t.dataset.meleeClasses.split(" "),
            n = t.querySelector("input"),
            o = !e.includes("all") && !e.includes(currentClass);
          t.classList.toggle("disabled", o),
            o && (n.checked = !1),
            (n.disabled = o);
        }),
          recalculateAllDamage();
      }

      /* -------- ARMOR OPTIMIZATION FUNCTIONS -------- */
      function findOptimalBuilds() {
        if (inventoryData.length === 0) {
          showNotification("Please load your inventory first", "info");
          return;
        }

        // Get target stats from the stat selector
        const targetStats = {
          mobility: getTargetStatValue("Weapons"),
          resilience: getTargetStatValue("Health"),
          recovery: getTargetStatValue("Class"),
          discipline: getTargetStatValue("Grenade"),
          intellect: getTargetStatValue("Super"),
          strength: getTargetStatValue("Melee"),
        };

        // Filter by selected class
        const classMap = { titan: 0, hunter: 1, warlock: 2 };
        const classId = classMap[currentClass];

        // Group armor by type
        const armorByType = {
          helmet: [],
          gauntlets: [],
          chest: [],
          legs: [],
          classItem: [],
        };

        const bucketToType = {
          3448274439: "helmet",
          3551918588: "gauntlets",
          14239492: "chest",
          20886954: "legs",
          1585787867: "classItem",
        };

        inventoryData.forEach((item) => {
          const type = bucketToType[item.bucketHash];
          if (!type) return;

          if (
            item.classType !== undefined &&
            item.classType !== 3 &&
            item.classType !== classId
          ) {
            return;
          }

          armorByType[type].push(item);
        });

        const selectedExotic = document.getElementById("exoticSelect").value;

        // limit search space
        Object.keys(armorByType).forEach((key) => {
          armorByType[key] = armorByType[key]
            .sort((a, b) => {
              const getTotal = (it) =>
                Object.values(it.stats || {}).reduce((s, v) => s + v, 0);
              return getTotal(b) - getTotal(a);
            })
            .slice(0, 20);
        });

        const results = [];

        for (const helmet of armorByType.helmet) {
          for (const gauntlets of armorByType.gauntlets) {
            for (const chest of armorByType.chest) {
              for (const legs of armorByType.legs) {
                for (const classItem of armorByType.classItem) {
                  const pieces = [helmet, gauntlets, chest, legs, classItem];
                  const exotics = pieces.filter((p) => p.isExotic);
                  if (exotics.length > 1) continue;
                  if (
                    selectedExotic &&
                    !pieces.find((p) => p.itemInstanceId === selectedExotic)
                  )
                    continue;

                  const totals = calculateTotalStats(pieces);
                  const meets = Object.keys(targetStats).every(
                    (k) => totals[k] >= targetStats[k]
                  );
                  if (meets) {
                    results.push({ pieces, totals });
                  }
                }
              }
            }
          }
        }

        displayBuildResults(results, 1);
      }

      const buildsPerPage = 25;
      let currentPage = 1;

      function displayBuildResults(results, page = 1) {
        const container = document.getElementById("resultsContainer");
        if (!container) return;
        const resultsDiv = document.getElementById("optimizationResults");
        if (results.length === 0) {
          container.innerHTML =
            '<div class="empty-state">No matching builds found.</div>';
          resultsDiv.style.display = "block";
          return;
        }

        currentPage = page;
        const totalPages = Math.ceil(results.length / buildsPerPage);
        const start = (page - 1) * buildsPerPage;
        const pageResults = results.slice(start, start + buildsPerPage);

        container.innerHTML = pageResults
          .map((res, idx) => {
            const buildNumber = start + idx + 1;
            const statHtml = Object.entries(res.totals)
              .map(
                ([k, v]) =>
                  `<div class="result-stat"><div class="result-stat-name">${k.toUpperCase()}</div><div class="result-stat-value">${v}</div></div>`
              )
              .join("");

            const pieceHtml = res.pieces
              .map(
                (p) => `
                <div class="result-armor-piece ${p.isExotic ? "exotic" : ""}">
                  <div class="result-armor-icon">
                    ${p.icon ? `<img src="${p.icon}" />` : ""}
                  </div>
                  <div class="result-armor-name">${p.displayName}</div>
                </div>`
              )
              .join("");

            return `
              <div class="result-item">
                <div class="result-header">
                  <div class="result-title">Build ${buildNumber}</div>
                </div>
                <div class="result-stats">${statHtml}</div>
                <div class="result-armor-grid">${pieceHtml}</div>
                <button class="load-result-button" onclick="loadGeneratedBuild(${buildNumber - 1})">Load This Build</button>
              </div>`;
          })
          .join("");

        updatePaginationControls(totalPages);
        resultsDiv.style.display = "block";
        window.generatedBuilds = results;
      }

      function updatePaginationControls(totalPages) {
        const controls = document.getElementById("paginationControls");
        if (!controls) return;
        if (totalPages <= 1) {
          controls.innerHTML = "";
          return;
        }
        controls.innerHTML = `
          <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>Prev</button>
          <span>Page ${currentPage} / ${totalPages}</span>
          <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""}>Next</button>
        `;
      }

      function changePage(p) {
        displayBuildResults(window.generatedBuilds, p);
      }

      function loadGeneratedBuild(index) {
        const build = window.generatedBuilds?.[index];
        if (!build) return;
        selectedInventoryItems = {};
        build.pieces.forEach((p) => {
          selectedInventoryItems[p.itemInstanceId] = p;
        });
        updateArmorDisplay();
        updateBuildSummary();
        showNotification("Build loaded", "success");
      }

      function updateExoticOptions() {
        const select = document.getElementById("exoticSelect");
        if (!select) return;
        const classMap = { titan: 0, hunter: 1, warlock: 2 };
        const classId = classMap[currentClass];

        const exotics = inventoryData.filter(
          (i) =>
            i.isExotic &&
            (i.classType === undefined ||
              i.classType === 3 ||
              i.classType === classId)
        );

        const slotOrder = {
          3448274439: 0,
          3551918588: 1,
          14239492: 2,
          20886954: 3,
          1585787867: 4,
        };

        exotics.sort((a, b) => {
          if (slotOrder[a.bucketHash] !== slotOrder[b.bucketHash]) {
            return slotOrder[a.bucketHash] - slotOrder[b.bucketHash];
          }
          return a.displayName.localeCompare(b.displayName);
        });

        const current = select.value;
        select.innerHTML =
          '<option value="">Any Exotic</option>' +
          exotics
            .map(
              (e) =>
                `<option value="${e.itemInstanceId}">${e.displayName}</option>`
            )
            .join("");

        if (current) select.value = current;
      }

      function getTargetStatValue(statName) {
        // Map the display stat names to actual stat names
        const statMap = {
          Weapons: "mobility",
          Health: "resilience",
          Class: "recovery",
          Melee: "strength",
          Grenade: "discipline",
          Super: "intellect",
        };

        return state.statValues[statName] || 10;
      }

      function calculateTotalStats(armorPieces) {
        const totals = {
          mobility: 0,
          resilience: 0,
          recovery: 0,
          discipline: 0,
          intellect: 0,
          strength: 0,
        };

        armorPieces.forEach((item) => {
          if (item && item.stats) {
            Object.entries(item.stats).forEach(([stat, value]) => {
              if (totals.hasOwnProperty(stat)) {
                totals[stat] += value;
              }
            });
          }
        });

        return totals;
      }

      function calculateOptimizationScore(actualStats, targetStats) {
        let score = 0;

        // Calculate score based on how close we are to target tiers
        Object.entries(targetStats).forEach(([stat, target]) => {
          const actual = actualStats[stat] || 0;
          const targetTier = Math.floor(target / 10);
          const actualTier = Math.floor(actual / 10);

          // Penalize being under target more than being over
          if (actualTier < targetTier) {
            score -= (targetTier - actualTier) * 20;
          } else if (actualTier > targetTier) {
            score -= (actualTier - targetTier) * 5;
          } else {
            score += 10;
          }

          // Bonus for getting close to the next tier
          const remainder = actual % 10;
          if (remainder >= 8) {
            score += 2;
          }
        });

        return score;
      }

      function clearSelection() {
        selectedInventoryItems = {};
        updateArmorDisplay();
        updateBuildSummary();
        showNotification("Selection cleared", "info");
      }

      /* -------- LOADOUT MANAGEMENT FUNCTIONS -------- */
      function showLoadoutModal() {
        document.getElementById("loadoutModal").style.display = "block";
        displayLoadouts();
      }

      function hideLoadoutModal() {
        document.getElementById("loadoutModal").style.display = "none";
      }

      function saveLoadout() {
        const name =
          document.getElementById("loadoutName").value ||
          `Loadout ${savedLoadouts.length + 1}`;

        if (Object.keys(selectedInventoryItems).length === 0) {
          showNotification("No armor selected to save", "error");
          return;
        }

        const loadout = {
          name: name,
          timestamp: new Date().toISOString(),
          items: JSON.parse(JSON.stringify(selectedInventoryItems)),
          targetStats: JSON.parse(JSON.stringify(state.statValues)),
        };

        savedLoadouts.push(loadout);
        localStorage.setItem("d2ArmorLoadouts", JSON.stringify(savedLoadouts));

        document.getElementById("loadoutName").value = "";
        displayLoadouts();
        showNotification(`Loadout "${name}" saved!`, "success");
      }

      function loadSavedLoadouts() {
        const saved = localStorage.getItem("d2ArmorLoadouts");
        if (saved) {
          savedLoadouts = JSON.parse(saved);
        }
      }

      function displayLoadouts() {
        const container = document.getElementById("loadoutList");

        if (savedLoadouts.length === 0) {
          container.innerHTML =
            '<div style="text-align: center; color: #aaa;">No saved loadouts</div>';
          return;
        }

        container.innerHTML = savedLoadouts
          .map(
            (loadout, index) => `
          <div class="loadout-item">
            <div>
              <strong style="color: #ffd700;">${loadout.name}</strong>
              <br>
              <small style="color: #aaa;">${new Date(loadout.timestamp).toLocaleDateString()}</small>
            </div>
            <div style="display: flex; gap: 10px;">
              <button class="auth-button-small" style="padding: 8px 16px; font-size: 0.9em;" 
                onclick="loadLoadout(${index})">Load</button>
              <button class="auth-button-small" style="padding: 8px 16px; font-size: 0.9em; background: linear-gradient(135deg, #dc3545, #c82333);" 
                onclick="deleteLoadout(${index})">Delete</button>
            </div>
          </div>
        `
          )
          .join("");
      }

      function loadLoadout(index) {
        const loadout = savedLoadouts[index];
        if (!loadout) return;

        // Clear current selection
        selectedInventoryItems = {};

        // Load the saved items
        Object.entries(loadout.items).forEach(([instanceId, item]) => {
          // Find the item in current inventory
          const currentItem = inventoryData.find(
            (i) => i.itemInstanceId === instanceId
          );
          if (currentItem) {
            selectedInventoryItems[instanceId] = currentItem;
          }
        });

        // Load target stats if saved
        if (loadout.targetStats) {
          state.statValues = JSON.parse(JSON.stringify(loadout.targetStats));
          updateAllStatCalculations();
        }

        updateArmorDisplay();
        updateBuildSummary();
        hideLoadoutModal();
        showNotification(`Loaded "${loadout.name}"`, "success");
      }

      function deleteLoadout(index) {
        const loadout = savedLoadouts[index];
        if (confirm(`Delete "${loadout.name}"?`)) {
          savedLoadouts.splice(index, 1);
          localStorage.setItem(
            "d2ArmorLoadouts",
            JSON.stringify(savedLoadouts)
          );
          displayLoadouts();
          showNotification(`Deleted "${loadout.name}"`, "info");
        }
      }
