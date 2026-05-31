# Bungie.Net API Reference Snapshot

Source OpenAPI: https://raw.githubusercontent.com/Bungie-net/api/master/openapi-2.json

Rendered docs: https://bungie-net.github.io/

API version: 2.21.9

Generated: 2026-05-31T02:47:05.047Z

Note: This markdown is generated from Bungie's official OpenAPI specification. Re-generate when Bungie updates the spec or the live manifest changes.

---

## API Info

Title: Bungie.Net API

These endpoints constitute the functionality exposed by Bungie.net, both for more traditional website functionality and for connectivity to Bungie video games and their related functionality.

Base URL: https://www.bungie.net/Platform

## Security Definitions

### apiKey

- type: apiKey
- description: Every request requires an API key.  To get an API key, register a new application at https://www.bungie.net/en/Application.
- name: X-API-Key
- in: header

### oauth2

- type: oauth2
- description: For requests that require Authentication, you will need to have your users authenticate via our OAuth mechanisms.  See https://github.com/Bungie-net/api/wiki/OAuth-Documentation for more details.
- authorizationUrl: https://www.bungie.net/en/OAuth/Authorize
- tokenUrl: https://www.bungie.net/Platform/App/OAuth/token/
- flow: accessCode

Scopes:

- `ReadBasicUserProfile`: Read basic user profile information such as the user's handle, avatar icon, etc.
- `ReadGroups`: Read Group/Clan Forums, Wall, and Members for groups and clans that the 
user has joined.
- `WriteGroups`: Write Group/Clan Forums, Wall, and Members for groups and clans that the 
user has joined.
- `AdminGroups`: Administer Group/Clan Forums, Wall, and Members for groups and clans that the 
user is a founder or an administrator.
- `BnetWrite`: Create new groups, clans, and forum posts, along with other actions that are reserved for Bungie.net
elevated scope: not meant to be used by third party applications.
- `MoveEquipDestinyItems`: Move or equip Destiny items
- `ReadDestinyInventoryAndVault`: Read Destiny 1 Inventory and Vault contents.
For Destiny 2, this scope is needed to read anything regarded as private. This is the only scope a
Destiny 2 app needs for read operations against Destiny 2 data such as inventory, vault, currency,
vendors, milestones, progression, etc.
- `ReadUserData`: Read user data such as who they are web notifications, 
clan/group memberships, recent activity, muted users.
- `EditUserData`: Edit user data such as preferred language, status, motto, avatar selection and theme.
- `ReadDestinyVendorsAndAdvisors`: Access vendor and advisor data specific to a user. OBSOLETE. This scope is only used on the Destiny 1 API.
- `ReadAndApplyTokens`: Read offer history and claim and apply tokens for the user.
- `AdvancedWriteActions`: Can perform actions that will result in a prompt to the user via the Destiny app.
- `PartnerOfferGrant`: Can use the partner offer api to claim rewards defined for a partner
- `DestinyUnlockValueQuery`: Allows an app to query sensitive information like unlock flags and values not available through normal methods.
- `UserPiiRead`: Allows an app to query sensitive user PII, most notably email information.

## Endpoints

### GET /App/ApiUsage/{applicationId}/

Tags: App

Operation ID: `App.GetApplicationApiUsage`

Get API usage by application for time frame specified. You can go as far back as 30 days ago, and can ask for up to a 48 hour window of time in a single request. You must be authenticated with at least the ReadUserData permission to access this endpoint.

Security: oauth2(ReadUserData)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `applicationId` | path | yes | `integer(int32)` | ID of the application to get usage statistics. |
| `end` | query | no | `string(date-time)` | End time for query. Goes to now if not specified. |
| `start` | query | no | `string(date-time)` | Start time for query. Goes to 24 hours ago if not specified. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /App/FirstParty/

Tags: App

Operation ID: `App.GetBungieApplications`

Get list of applications created by Bungie.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /CommunityContent/Get/{sort}/{mediaFilter}/{page}/

Tags: CommunityContent

Operation ID: `CommunityContent.GetCommunityContent`

Returns community content.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `mediaFilter` | path | yes | `integer(int32)` | The type of media to get |
| `page` | path | yes | `integer(int32)` | Zero based page |
| `sort` | path | yes | `integer(byte)` | The sort mode. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Content/GetContentById/{id}/{locale}/

Tags: Content

Operation ID: `Content.GetContentById`

Returns a content item referenced by id

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `head` | query | no | `boolean` | false |
| `id` | path | yes | `integer(int64)` |  |
| `locale` | path | yes | `string` |  |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Content/GetContentByTagAndType/{tag}/{type}/{locale}/

Tags: Content

Operation ID: `Content.GetContentByTagAndType`

Returns the newest item that matches a given tag and Content Type.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `head` | query | no | `boolean` | Not used. |
| `locale` | path | yes | `string` |  |
| `tag` | path | yes | `string` |  |
| `type` | path | yes | `string` |  |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Content/GetContentType/{type}/

Tags: Content

Operation ID: `Content.GetContentType`

Gets an object describing a particular variant of content.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `type` | path | yes | `string` |  |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Content/Rss/NewsArticles/{pageToken}/

Tags: Content

Operation ID: `Content.RssNewsArticles`

Returns a JSON string response that is the RSS feed for news articles.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `categoryfilter` | query | no | `string` | Optionally filter response to only include news items in a certain category. |
| `includebody` | query | no | `boolean` | Optionally include full content body for each news item. |
| `pageToken` | path | yes | `string` | Zero-based pagination token for paging through result sets. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Content/Search/{locale}/

Tags: Content

Operation ID: `Content.SearchContentWithText`

Gets content based on querystring information passed in. Provides basic search and text search capabilities.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `ctype` | query | no | `string` | Content type tag: Help, News, etc. Supply multiple ctypes separated by space. |
| `currentpage` | query | no | `integer(int32)` | Page number for the search results, starting with page 1. |
| `head` | query | no | `boolean` | Not used. |
| `locale` | path | yes | `string` |  |
| `searchtext` | query | no | `string` | Word or phrase for the search. |
| `source` | query | no | `string` | For analytics, hint at the part of the app that triggered the search. Optional. |
| `tag` | query | no | `string` | Tag used on the content to be searched. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Content/SearchContentByTagAndType/{tag}/{type}/{locale}/

Tags: Content

Operation ID: `Content.SearchContentByTagAndType`

Searches for Content Items that match the given Tag and Content Type.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `currentpage` | query | no | `integer(int32)` | Page number for the search results starting with page 1. |
| `head` | query | no | `boolean` | Not used. |
| `itemsperpage` | query | no | `integer(int32)` | Not used. |
| `locale` | path | yes | `string` |  |
| `tag` | path | yes | `string` |  |
| `type` | path | yes | `string` |  |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Content/SearchHelpArticles/{searchtext}/{size}/

Tags: Content

Operation ID: `Content.SearchHelpArticles`

Search for Help Articles.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `searchtext` | path | yes | `string` |  |
| `size` | path | yes | `string` |  |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Actions/Items/EquipItem/

Tags: Destiny2

Operation ID: `Destiny2.EquipItem`

Equip an item. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline.

Security: oauth2(MoveEquipDestinyItems)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Actions/Items/EquipItems/

Tags: Destiny2

Operation ID: `Destiny2.EquipItems`

Equip a list of items by itemInstanceIds. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline. Any items not found on your character will be ignored.

Security: oauth2(MoveEquipDestinyItems)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | The results of a bulk Equipping operation performed through the Destiny API. |

### POST /Destiny2/Actions/Items/InsertSocketPlug/

Tags: Destiny2, Preview

Operation ID: `Destiny2.InsertSocketPlug`

Insert a plug into a socketed item. I know how it sounds, but I assure you it's much more G-rated than you might be guessing. We haven't decided yet whether this will be able to insert plugs that have side effects, but if we do it will require special scope permission for an application attempting to do so. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline. Request must include proof of permission for 'InsertPlugs' from the account owner.

Security: oauth2(AdvancedWriteActions)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Actions/Items/InsertSocketPlugFree/

Tags: Destiny2, Preview

Operation ID: `Destiny2.InsertSocketPlugFree`

Insert a 'free' plug into an item's socket. This does not require 'Advanced Write Action' authorization and is available to 3rd-party apps, but will only work on 'free and reversible' socket actions (Perks, Armor Mods, Shaders, Ornaments, etc.). You must have a valid Destiny Account, and the character must either be in a social space, in orbit, or offline.

Security: oauth2(MoveEquipDestinyItems)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Actions/Items/PullFromPostmaster/

Tags: Destiny2

Operation ID: `Destiny2.PullFromPostmaster`

Extract an item from the Postmaster, with whatever implications that may entail. You must have a valid Destiny account. You must also pass BOTH a reference AND an instance ID if it's an instanced item.

Security: oauth2(MoveEquipDestinyItems)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Actions/Items/SetLockState/

Tags: Destiny2

Operation ID: `Destiny2.SetItemLockState`

Set the Lock State for an instanced item. You must have a valid Destiny Account.

Security: oauth2(MoveEquipDestinyItems)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Actions/Items/SetTrackedState/

Tags: Destiny2

Operation ID: `Destiny2.SetQuestTrackedState`

Set the Tracking State for an instanced item, if that item is a Quest or Bounty. You must have a valid Destiny Account. Yeah, it's an item.

Security: oauth2(MoveEquipDestinyItems)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Actions/Items/TransferItem/

Tags: Destiny2

Operation ID: `Destiny2.TransferItem`

Transfer an item to/from your vault. You must have a valid Destiny account. You must also pass BOTH a reference AND an instance ID if it's an instanced item. itshappening.gif

Security: oauth2(MoveEquipDestinyItems)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Actions/Loadouts/ClearLoadout/

Tags: Destiny2

Operation ID: `Destiny2.ClearLoadout`

Clear the identifiers and items of a loadout.

Security: oauth2(MoveEquipDestinyItems)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Actions/Loadouts/EquipLoadout/

Tags: Destiny2

Operation ID: `Destiny2.EquipLoadout`

Equip a loadout. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline.

Security: oauth2(MoveEquipDestinyItems)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Actions/Loadouts/SnapshotLoadout/

Tags: Destiny2

Operation ID: `Destiny2.SnapshotLoadout`

Snapshot a loadout with the currently equipped items.

Security: oauth2(MoveEquipDestinyItems)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Actions/Loadouts/UpdateLoadoutIdentifiers/

Tags: Destiny2

Operation ID: `Destiny2.UpdateLoadoutIdentifiers`

Update the color, icon, and name of a loadout.

Security: oauth2(MoveEquipDestinyItems)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/Armory/Search/{type}/{searchTerm}/

Tags: Destiny2

Operation ID: `Destiny2.SearchDestinyEntities`

Gets a page list of Destiny items.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `page` | query | no | `integer(int32)` | Page number to return, starting with 0. |
| `searchTerm` | path | yes | `string` | The string to use when searching for Destiny entities. |
| `type` | path | yes | `string` | The type of entity for whom you would like results. These correspond to the entity's definition contract name. For instance, if you are looking for items, this property should be 'DestinyInventoryItemDefinition'. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | The results of a search for Destiny content. This will be improved on over time, I've been doing some experimenting to see what might be useful. |

### POST /Destiny2/Awa/AwaProvideAuthorizationResult/

Tags: Destiny2

Operation ID: `Destiny2.AwaProvideAuthorizationResult`

Provide the result of the user interaction. Called by the Bungie Destiny App to approve or reject a request.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/Awa/GetActionToken/{correlationId}/

Tags: Destiny2

Operation ID: `Destiny2.AwaGetActionToken`

Returns the action token if user approves the request.

Security: oauth2(AdvancedWriteActions)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `correlationId` | path | yes | `string` | The identifier for the advanced write action request. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Awa/Initialize/

Tags: Destiny2

Operation ID: `Destiny2.AwaInitializeRequest`

Initialize a request to perform an advanced write action.

Security: oauth2(AdvancedWriteActions)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/Clan/ClanBannerDictionary/

Tags: Destiny2

Operation ID: `Destiny2.GetClanBannerSource`

Returns the dictionary of values for the Clan Banner

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/Clan/{groupId}/WeeklyRewardState/

Tags: Destiny2

Operation ID: `Destiny2.GetClanWeeklyRewardState`

Returns information on the weekly clan rewards and if the clan has earned them or not. Note that this will always report rewards as not redeemed.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | A valid group id of clan. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Represents a runtime instance of a user's milestone status. Live Milestone data should be combined with DestinyMilestoneDefinition data to show the user a picture of what is available for them to do in the game, and their status in regards to said "things to do." Consider it a big, wonky to-do list, or Advisors 3.0 for those who remember the Destiny 1 API. |

### GET /Destiny2/Manifest/

Tags: Destiny2

Operation ID: `Destiny2.GetDestinyManifest`

Returns the current version of the manifest as a json object.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | DestinyManifest is the external-facing contract for just the properties needed by those calling the Destiny Platform. |

### GET /Destiny2/Manifest/{entityType}/{hashIdentifier}/

Tags: Destiny2

Operation ID: `Destiny2.GetDestinyEntityDefinition`

Returns the static definition of an entity of the given Type and hash identifier. Examine the API Documentation for the Type Names of entities that have their own definitions. Note that the return type will always *inherit from* DestinyDefinition, but the specific type returned will be the requested entity type if it can be found. Please don't use this as a chatty alternative to the Manifest database if you require large sets of data, but for simple and one-off accesses this should be handy.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `entityType` | path | yes | `string` | The type of entity for whom you would like results. These correspond to the entity's definition contract name. For instance, if you are looking for items, this property should be 'DestinyInventoryItemDefinition'. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is tentatively in final form, but there may be bugs that prevent desirable operation. |
| `hashIdentifier` | path | yes | `integer(uint32)` | The hash identifier for the specific Entity you want returned. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Provides common properties for destiny definitions. |

### GET /Destiny2/Milestones/

Tags: Destiny2

Operation ID: `Destiny2.GetPublicMilestones`

Gets public information about currently available Milestones.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/Milestones/{milestoneHash}/Content/

Tags: Destiny2

Operation ID: `Destiny2.GetPublicMilestoneContent`

Gets custom localized content for the milestone of the given hash, if it exists.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `milestoneHash` | path | yes | `integer(uint32)` | The identifier for the milestone to be returned. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Represents localized, extended content related to Milestones. This is intentionally returned by a separate endpoint and not with Character-level Milestone data because we do not put localized data into standard Destiny responses, both for brevity of response and for caching purposes. If you really need this data, hit the Milestone Content endpoint. |

### POST /Destiny2/SearchDestinyPlayerByBungieName/{membershipType}/

Tags: Destiny2

Operation ID: `Destiny2.SearchDestinyPlayerByBungieName`

Returns a list of Destiny memberships given a global Bungie Display Name. This method will hide overridden memberships due to cross save.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type, or All. Indicates which memberships to return. You probably want this set to All. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/Stats/AggregateClanStats/{groupId}/

Tags: Destiny2, Preview

Operation ID: `Destiny2.GetClanAggregateStats`

Gets aggregated stats for a clan using the same categories as the clan leaderboards. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | Group ID of the clan whose leaderboards you wish to fetch. |
| `modes` | query | no | `string` | List of game modes for which to get leaderboards. See the documentation for DestinyActivityModeType for valid values, and pass in string representation, comma delimited. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/Stats/Definition/

Tags: Destiny2

Operation ID: `Destiny2.GetHistoricalStatsDefinition`

Gets historical stats definitions.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/Stats/Leaderboards/Clans/{groupId}/

Tags: Destiny2, Preview

Operation ID: `Destiny2.GetClanLeaderboards`

Gets leaderboards with the signed in user's friends and the supplied destinyMembershipId as the focus. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | Group ID of the clan whose leaderboards you wish to fetch. |
| `maxtop` | query | no | `integer(int32)` | Maximum number of top players to return. Use a large number to get entire leaderboard. |
| `modes` | query | no | `string` | List of game modes for which to get leaderboards. See the documentation for DestinyActivityModeType for valid values, and pass in string representation, comma delimited. |
| `statid` | query | no | `string` | ID of stat to return rather than returning all Leaderboard stats. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/Stats/Leaderboards/{membershipType}/{destinyMembershipId}/{characterId}/

Tags: Destiny2, Preview

Operation ID: `Destiny2.GetLeaderboardsForCharacter`

Gets leaderboards with the signed in user's friends and the supplied destinyMembershipId as the focus. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `characterId` | path | yes | `integer(int64)` | The specific character to build the leaderboard around for the provided Destiny Membership. |
| `destinyMembershipId` | path | yes | `integer(int64)` | The Destiny membershipId of the user to retrieve. |
| `maxtop` | query | no | `integer(int32)` | Maximum number of top players to return. Use a large number to get entire leaderboard. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |
| `modes` | query | no | `string` | List of game modes for which to get leaderboards. See the documentation for DestinyActivityModeType for valid values, and pass in string representation, comma delimited. |
| `statid` | query | no | `string` | ID of stat to return rather than returning all Leaderboard stats. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/Stats/PostGameCarnageReport/{activityId}/

Tags: Destiny2

Operation ID: `Destiny2.GetPostGameCarnageReport`

Gets the available post game carnage report for the activity ID.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `activityId` | path | yes | `integer(int64)` | The ID of the activity whose PGCR is requested. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Destiny2/Stats/PostGameCarnageReport/{activityId}/Report/

Tags: Destiny2

Operation ID: `Destiny2.ReportOffensivePostGameCarnageReportPlayer`

Report a player that you met in an activity that was engaging in ToS-violating activities. Both you and the offending player must have played in the activityId passed in. Please use this judiciously and only when you have strong suspicions of violation, pretty please.

Security: oauth2(BnetWrite)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `activityId` | path | yes | `integer(int64)` | The ID of the activity where you ran into the brigand that you're reporting. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/Vendors/

Tags: Destiny2, Preview

Operation ID: `Destiny2.GetPublicVendors`

Get items available from vendors where the vendors have items for sale that are common for everyone. If any portion of the Vendor's available inventory is character or account specific, we will be unable to return their data from this endpoint due to the way that available inventory is computed. As I am often guilty of saying: 'It's a long story...'

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `components` | query | no | `integer(int32)[]` | A comma separated list of components to return (as strings or numeric values). See the DestinyComponentType enum for valid components to request. You must request at least one component to receive results. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | A response containing all valid components for the public Vendors endpoint.<br> It is a decisively smaller subset of data compared to what we can get when we know the specific user making the request.<br> If you want any of the other data - item details, whether or not you can buy it, etc... you'll have to call in the context of a character. I know, sad but true. |

### GET /Destiny2/{membershipType}/Account/{destinyMembershipId}/Character/{characterId}/Stats/

Tags: Destiny2

Operation ID: `Destiny2.GetHistoricalStats`

Gets historical stats for indicated character.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `characterId` | path | yes | `integer(int64)` | The id of the character to retrieve. You can omit this character ID or set it to 0 to get aggregate stats across all characters. |
| `dayend` | query | no | `string(date-time)` | Last day to return when daily stats are requested. Use the format YYYY-MM-DD. Currently, we cannot allow more than 31 days of daily data to be requested in a single request. |
| `daystart` | query | no | `string(date-time)` | First day to return when daily stats are requested. Use the format YYYY-MM-DD. Currently, we cannot allow more than 31 days of daily data to be requested in a single request. |
| `destinyMembershipId` | path | yes | `integer(int64)` | The Destiny membershipId of the user to retrieve. |
| `groups` | query | no | `integer(int32)[]` | Group of stats to include, otherwise only general stats are returned. Comma separated list is allowed. Values: General, Weapons, Medals |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |
| `modes` | query | no | `integer(int32)[]` | Game modes to return. See the documentation for DestinyActivityModeType for valid values, and pass in string representation, comma delimited. |
| `periodType` | query | no | `integer(int32)` | Indicates a specific period type to return. Optional. May be: Daily, AllTime, or Activity |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/{membershipType}/Account/{destinyMembershipId}/Character/{characterId}/Stats/Activities/

Tags: Destiny2

Operation ID: `Destiny2.GetActivityHistory`

Gets activity history stats for indicated character.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `characterId` | path | yes | `integer(int64)` | The id of the character to retrieve. |
| `count` | query | no | `integer(int32)` | Number of rows to return |
| `destinyMembershipId` | path | yes | `integer(int64)` | The Destiny membershipId of the user to retrieve. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |
| `mode` | query | no | `integer(int32)` | A filter for the activity mode to be returned. None returns all activities. See the documentation for DestinyActivityModeType for valid values, and pass in string representation. |
| `page` | query | no | `integer(int32)` | Page number to return, starting with 0. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/{membershipType}/Account/{destinyMembershipId}/Character/{characterId}/Stats/AggregateActivityStats/

Tags: Destiny2

Operation ID: `Destiny2.GetDestinyAggregateActivityStats`

Gets all activities the character has participated in together with aggregate statistics for those activities.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `characterId` | path | yes | `integer(int64)` | The specific character whose activities should be returned. |
| `destinyMembershipId` | path | yes | `integer(int64)` | The Destiny membershipId of the user to retrieve. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/{membershipType}/Account/{destinyMembershipId}/Character/{characterId}/Stats/UniqueWeapons/

Tags: Destiny2

Operation ID: `Destiny2.GetUniqueWeaponHistory`

Gets details about unique weapon usage, including all exotic weapons.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `characterId` | path | yes | `integer(int64)` | The id of the character to retrieve. |
| `destinyMembershipId` | path | yes | `integer(int64)` | The Destiny membershipId of the user to retrieve. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/{membershipType}/Account/{destinyMembershipId}/Stats/

Tags: Destiny2

Operation ID: `Destiny2.GetHistoricalStatsForAccount`

Gets aggregate historical stats organized around each character for a given account.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `destinyMembershipId` | path | yes | `integer(int64)` | The Destiny membershipId of the user to retrieve. |
| `groups` | query | no | `integer(int32)[]` | Groups of stats to include, otherwise only general stats are returned. Comma separated list is allowed. Values: General, Weapons, Medals. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/{membershipType}/Account/{destinyMembershipId}/Stats/Leaderboards/

Tags: Destiny2, Preview

Operation ID: `Destiny2.GetLeaderboards`

Gets leaderboards with the signed in user's friends and the supplied destinyMembershipId as the focus. PREVIEW: This endpoint has not yet been implemented. It is being returned for a preview of future functionality, and for public comment/suggestion/preparation.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `destinyMembershipId` | path | yes | `integer(int64)` | The Destiny membershipId of the user to retrieve. |
| `maxtop` | query | no | `integer(int32)` | Maximum number of top players to return. Use a large number to get entire leaderboard. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |
| `modes` | query | no | `string` | List of game modes for which to get leaderboards. See the documentation for DestinyActivityModeType for valid values, and pass in string representation, comma delimited. |
| `statid` | query | no | `string` | ID of stat to return rather than returning all Leaderboard stats. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Destiny2/{membershipType}/Profile/{destinyMembershipId}/

Tags: Destiny2

Operation ID: `Destiny2.GetProfile`

Returns Destiny Profile information for the supplied membership.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `components` | query | no | `integer(int32)[]` | A comma separated list of components to return (as strings or numeric values). See the DestinyComponentType enum for valid components to request. You must request at least one component to receive results. |
| `destinyMembershipId` | path | yes | `integer(int64)` | Destiny membership ID. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | The response for GetDestinyProfile, with components for character and item-level data. |

### GET /Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/

Tags: Destiny2

Operation ID: `Destiny2.GetCharacter`

Returns character information for the supplied character.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `characterId` | path | yes | `integer(int64)` | ID of the character. |
| `components` | query | no | `integer(int32)[]` | A comma separated list of components to return (as strings or numeric values). See the DestinyComponentType enum for valid components to request. You must request at least one component to receive results. |
| `destinyMembershipId` | path | yes | `integer(int64)` | Destiny membership ID. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | The response contract for GetDestinyCharacter, with components that can be returned for character and item-level data. |

### GET /Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/Collectibles/{collectiblePresentationNodeHash}/

Tags: Destiny2

Operation ID: `Destiny2.GetCollectibleNodeDetails`

Given a Presentation Node that has Collectibles as direct descendants, this will return item details about those descendants in the context of the requesting character.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `characterId` | path | yes | `integer(int64)` | The Destiny Character ID of the character for whom we're getting collectible detail info. |
| `collectiblePresentationNodeHash` | path | yes | `integer(uint32)` | The hash identifier of the Presentation Node for whom we should return collectible details. Details will only be returned for collectibles that are direct descendants of this node. |
| `components` | query | no | `integer(int32)[]` | A comma separated list of components to return (as strings or numeric values). See the DestinyComponentType enum for valid components to request. You must request at least one component to receive results. |
| `destinyMembershipId` | path | yes | `integer(int64)` | Destiny membership ID of another user. You may be denied. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Returns the detailed information about a Collectible Presentation Node and any Collectibles that are direct descendants. |

### GET /Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/Vendors/

Tags: Destiny2

Operation ID: `Destiny2.GetVendors`

Get currently available vendors from the list of vendors that can possibly have rotating inventory. Note that this does not include things like preview vendors and vendors-as-kiosks, neither of whom have rotating/dynamic inventories. Use their definitions as-is for those.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `characterId` | path | yes | `integer(int64)` | The Destiny Character ID of the character for whom we're getting vendor info. |
| `components` | query | no | `integer(int32)[]` | A comma separated list of components to return (as strings or numeric values). See the DestinyComponentType enum for valid components to request. You must request at least one component to receive results. |
| `destinyMembershipId` | path | yes | `integer(int64)` | Destiny membership ID of another user. You may be denied. |
| `filter` | query | no | `integer(int32)` | The filter of what vendors and items to return, if any. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | A response containing all of the components for all requested vendors. |

### GET /Destiny2/{membershipType}/Profile/{destinyMembershipId}/Character/{characterId}/Vendors/{vendorHash}/

Tags: Destiny2

Operation ID: `Destiny2.GetVendor`

Get the details of a specific Vendor.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `characterId` | path | yes | `integer(int64)` | The Destiny Character ID of the character for whom we're getting vendor info. |
| `components` | query | no | `integer(int32)[]` | A comma separated list of components to return (as strings or numeric values). See the DestinyComponentType enum for valid components to request. You must request at least one component to receive results. |
| `destinyMembershipId` | path | yes | `integer(int64)` | Destiny membership ID of another user. You may be denied. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |
| `vendorHash` | path | yes | `integer(uint32)` | The Hash identifier of the Vendor to be returned. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | A response containing all of the components for a vendor. |

### GET /Destiny2/{membershipType}/Profile/{destinyMembershipId}/Item/{itemInstanceId}/

Tags: Destiny2

Operation ID: `Destiny2.GetItem`

Retrieve the details of an instanced Destiny Item. An instanced Destiny item is one with an ItemInstanceId. Non-instanced items, such as materials, have no useful instance-specific details and thus are not queryable here.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `components` | query | no | `integer(int32)[]` | A comma separated list of components to return (as strings or numeric values). See the DestinyComponentType enum for valid components to request. You must request at least one component to receive results. |
| `destinyMembershipId` | path | yes | `integer(int64)` | The membership ID of the destiny profile. |
| `itemInstanceId` | path | yes | `integer(int64)` | The Instance ID of the destiny item. |
| `membershipType` | path | yes | `integer(int32)` | A valid non-BungieNet membership type. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | The response object for retrieving an individual instanced item. None of these components are relevant for an item that doesn't have an "itemInstanceId": for those, get your information from the DestinyInventoryDefinition. |

### GET /Destiny2/{membershipType}/Profile/{membershipId}/LinkedProfiles/

Tags: Destiny2

Operation ID: `Destiny2.GetLinkedProfiles`

Returns a summary information about all profiles linked to the requesting membership type/membership ID that have valid Destiny information. The passed-in Membership Type/Membership ID may be a Bungie.Net membership or a Destiny membership. It only returns the minimal amount of data to begin making more substantive requests, but will hopefully serve as a useful alternative to UserServices for people who just care about Destiny data. Note that it will only return linked accounts whose linkages you are allowed to view.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `getAllMemberships` | query | no | `boolean` | (optional) if set to 'true', all memberships regardless of whether they're obscured by overrides will be returned. Normal privacy restrictions on account linking will still apply no matter what. |
| `membershipId` | path | yes | `integer(int64)` | The ID of the membership whose linked Destiny accounts you want returned. Make sure your membership ID matches its Membership Type: don't pass us a PSN membership ID and the XBox membership type, it's not going to work! |
| `membershipType` | path | yes | `integer(int32)` | The type for the membership whose linked Destiny accounts you want returned. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | I know what you seek. You seek linked accounts. Found them, you have.<br>This contract returns a minimal amount of data about Destiny Accounts that are linked through your Bungie.Net account. We will not return accounts in this response whose |

### GET /Fireteam/Clan/{groupId}/ActiveCount/

Tags: Fireteam

Operation ID: `Fireteam.GetActivePrivateClanFireteamCount`

Gets a count of all active non-public fireteams for the specified clan. Maximum value returned is 25.

Security: oauth2(ReadGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | The group id of the clan. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Fireteam/Clan/{groupId}/Available/{platform}/{activityType}/{dateRange}/{slotFilter}/{publicOnly}/{page}/

Tags: Fireteam

Operation ID: `Fireteam.GetAvailableClanFireteams`

Gets a listing of all of this clan's fireteams that are have available slots. Caller is not checked for join criteria so caching is maximized.

Security: oauth2(ReadGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `activityType` | path | yes | `integer(int32)` | The activity type to filter by. |
| `dateRange` | path | yes | `integer(byte)` | The date range to grab available fireteams. |
| `excludeImmediate` | query | no | `boolean` | If you wish the result to exclude immediate fireteams, set this to true. Immediate-only can be forced using the dateRange enum. |
| `groupId` | path | yes | `integer(int64)` | The group id of the clan. |
| `langFilter` | query | no | `string` | An optional language filter. |
| `page` | path | yes | `integer(int32)` | Zero based page |
| `platform` | path | yes | `integer(byte)` | The platform filter. |
| `publicOnly` | path | yes | `integer(byte)` | Determines public/private filtering. |
| `slotFilter` | path | yes | `integer(byte)` | Filters based on available slots |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Fireteam/Clan/{groupId}/My/{platform}/{includeClosed}/{page}/

Tags: Fireteam

Operation ID: `Fireteam.GetMyClanFireteams`

Gets a listing of all fireteams that caller is an applicant, a member, or an alternate of.

Security: oauth2(ReadGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupFilter` | query | no | `boolean` | If true, filter by clan. Otherwise, ignore the clan and show all of the user's fireteams. |
| `groupId` | path | yes | `integer(int64)` | The group id of the clan. (This parameter is ignored unless the optional query parameter groupFilter is true). |
| `includeClosed` | path | yes | `boolean` | If true, return fireteams that have been closed. |
| `langFilter` | query | no | `string` | An optional language filter. |
| `page` | path | yes | `integer(int32)` | Deprecated parameter, ignored. |
| `platform` | path | yes | `integer(byte)` | The platform filter. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Fireteam/Clan/{groupId}/Summary/{fireteamId}/

Tags: Fireteam

Operation ID: `Fireteam.GetClanFireteam`

Gets a specific fireteam.

Security: oauth2(ReadGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `fireteamId` | path | yes | `integer(int64)` | The unique id of the fireteam. |
| `groupId` | path | yes | `integer(int64)` | The group id of the clan. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Fireteam/Search/Available/{platform}/{activityType}/{dateRange}/{slotFilter}/{page}/

Tags: Fireteam

Operation ID: `Fireteam.SearchPublicAvailableClanFireteams`

Gets a listing of all public fireteams starting now with open slots. Caller is not checked for join criteria so caching is maximized.

Security: oauth2(ReadGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `activityType` | path | yes | `integer(int32)` | The activity type to filter by. |
| `dateRange` | path | yes | `integer(byte)` | The date range to grab available fireteams. |
| `excludeImmediate` | query | no | `boolean` | If you wish the result to exclude immediate fireteams, set this to true. Immediate-only can be forced using the dateRange enum. |
| `langFilter` | query | no | `string` | An optional language filter. |
| `page` | path | yes | `integer(int32)` | Zero based page |
| `platform` | path | yes | `integer(byte)` | The platform filter. |
| `slotFilter` | path | yes | `integer(byte)` | Filters based on available slots |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Forum/GetCoreTopicsPaged/{page}/{sort}/{quickDate}/{categoryFilter}/

Tags: Forum

Operation ID: `Forum.GetCoreTopicsPaged`

Gets a listing of all topics marked as part of the core group.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `categoryFilter` | path | yes | `integer(int32)` | The category filter. |
| `locales` | query | no | `string` | Comma seperated list of locales posts must match to return in the result list. Default 'en' |
| `page` | path | yes | `integer(int32)` | Zero base page |
| `quickDate` | path | yes | `integer(int32)` | The date filter. |
| `sort` | path | yes | `integer(byte)` | The sort mode. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Forum/GetForumTagSuggestions/

Tags: Forum

Operation ID: `Forum.GetForumTagSuggestions`

Gets tag suggestions based on partial text entry, matching them with other tags previously used in the forums.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `partialtag` | query | no | `string` | The partial tag input to generate suggestions from. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Forum/GetPostAndParent/{childPostId}/

Tags: Forum

Operation ID: `Forum.GetPostAndParent`

Returns the post specified and its immediate parent.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `childPostId` | path | yes | `integer(int64)` |  |
| `showbanned` | query | no | `string` | If this value is not null or empty, banned posts are requested to be returned |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Forum/GetPostAndParentAwaitingApproval/{childPostId}/

Tags: Forum

Operation ID: `Forum.GetPostAndParentAwaitingApproval`

Returns the post specified and its immediate parent of posts that are awaiting approval.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `childPostId` | path | yes | `integer(int64)` |  |
| `showbanned` | query | no | `string` | If this value is not null or empty, banned posts are requested to be returned |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Forum/GetPostsThreadedPaged/{parentPostId}/{page}/{pageSize}/{replySize}/{getParentPost}/{rootThreadMode}/{sortMode}/

Tags: Forum

Operation ID: `Forum.GetPostsThreadedPaged`

Returns a thread of posts at the given parent, optionally returning replies to those posts as well as the original parent.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `getParentPost` | path | yes | `boolean` |  |
| `page` | path | yes | `integer(int32)` |  |
| `pageSize` | path | yes | `integer(int32)` |  |
| `parentPostId` | path | yes | `integer(int64)` |  |
| `replySize` | path | yes | `integer(int32)` |  |
| `rootThreadMode` | path | yes | `boolean` |  |
| `showbanned` | query | no | `string` | If this value is not null or empty, banned posts are requested to be returned |
| `sortMode` | path | yes | `integer(int32)` |  |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Forum/GetPostsThreadedPagedFromChild/{childPostId}/{page}/{pageSize}/{replySize}/{rootThreadMode}/{sortMode}/

Tags: Forum

Operation ID: `Forum.GetPostsThreadedPagedFromChild`

Returns a thread of posts starting at the topicId of the input childPostId, optionally returning replies to those posts as well as the original parent.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `childPostId` | path | yes | `integer(int64)` |  |
| `page` | path | yes | `integer(int32)` |  |
| `pageSize` | path | yes | `integer(int32)` |  |
| `replySize` | path | yes | `integer(int32)` |  |
| `rootThreadMode` | path | yes | `boolean` |  |
| `showbanned` | query | no | `string` | If this value is not null or empty, banned posts are requested to be returned |
| `sortMode` | path | yes | `integer(int32)` |  |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Forum/GetTopicForContent/{contentId}/

Tags: Forum

Operation ID: `Forum.GetTopicForContent`

Gets the post Id for the given content item's comments, if it exists.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `contentId` | path | yes | `integer(int64)` |  |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Forum/GetTopicsPaged/{page}/{pageSize}/{group}/{sort}/{quickDate}/{categoryFilter}/

Tags: Forum

Operation ID: `Forum.GetTopicsPaged`

Get topics from any forum.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `categoryFilter` | path | yes | `integer(int32)` | A category filter |
| `group` | path | yes | `integer(int64)` | The group, if any. |
| `locales` | query | no | `string` | Comma seperated list of locales posts must match to return in the result list. Default 'en' |
| `page` | path | yes | `integer(int32)` | Zero paged page number |
| `pageSize` | path | yes | `integer(int32)` | Unused |
| `quickDate` | path | yes | `integer(int32)` | A date filter. |
| `sort` | path | yes | `integer(byte)` | The sort mode. |
| `tagstring` | query | no | `string` | The tags to search, if any. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Forum/Poll/{topicId}/

Tags: Forum

Operation ID: `Forum.GetPoll`

Gets the specified forum poll.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `topicId` | path | yes | `integer(int64)` | The post id of the topic that has the poll. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Forum/Recruit/Summaries/

Tags: Forum

Operation ID: `Forum.GetRecruitmentThreadSummaries`

Allows the caller to get a list of to 25 recruitment thread summary information objects.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GetAvailableLocales/

Tags: 

Operation ID: `.GetAvailableLocales`

List of available localization cultures

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GlobalAlerts/

Tags: 

Operation ID: `.GetGlobalAlerts`

Gets any active global alert for display in the forum banners, help pages, etc. Usually used for DOC alerts.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `includestreaming` | query | no | `boolean` | Determines whether Streaming Alerts are included in results |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/GetAvailableAvatars/

Tags: GroupV2

Operation ID: `GroupV2.GetAvailableAvatars`

Returns a list of all available group avatars for the signed-in user.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/GetAvailableThemes/

Tags: GroupV2

Operation ID: `GroupV2.GetAvailableThemes`

Returns a list of all available group themes.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/GetUserClanInviteSetting/{mType}/

Tags: GroupV2

Operation ID: `GroupV2.GetUserClanInviteSetting`

Gets the state of the user's clan invite preferences for a particular membership type - true if they wish to be invited to clans, false otherwise.

Security: oauth2(ReadUserData)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `mType` | path | yes | `integer(int32)` | The Destiny membership type of the account we wish to access settings. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/Name/{groupName}/{groupType}/

Tags: GroupV2

Operation ID: `GroupV2.GetGroupByName`

Get information about a specific group with the given name and type.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupName` | path | yes | `string` | Exact name of the group to find. |
| `groupType` | path | yes | `integer(int32)` | Type of group to find. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/NameV2/

Tags: GroupV2

Operation ID: `GroupV2.GetGroupByNameV2`

Get information about a specific group with the given name and type. The POST version.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/Recommended/{groupType}/{createDateRange}/

Tags: GroupV2

Operation ID: `GroupV2.GetRecommendedGroups`

Gets groups recommended for you based on the groups to whom those you follow belong.

Security: oauth2(ReadGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `createDateRange` | path | yes | `integer(int32)` | Requested range in which to pull recommended groups |
| `groupType` | path | yes | `integer(int32)` | Type of groups requested |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/Recover/{membershipType}/{membershipId}/{groupType}/

Tags: GroupV2

Operation ID: `GroupV2.RecoverGroupForFounder`

Allows a founder to manually recover a group they can see in game but not on bungie.net

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupType` | path | yes | `integer(int32)` | Type of group the supplied member founded. |
| `membershipId` | path | yes | `integer(int64)` | Membership ID to for which to find founded groups. |
| `membershipType` | path | yes | `integer(int32)` | Membership type of the supplied membership ID. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/Search/

Tags: GroupV2

Operation ID: `GroupV2.GroupSearch`

Search for Groups.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/User/Potential/{membershipType}/{membershipId}/{filter}/{groupType}/

Tags: GroupV2

Operation ID: `GroupV2.GetPotentialGroupsForMember`

Get information about the groups that a given member has applied to or been invited to.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `filter` | path | yes | `integer(int32)` | Filter apply to list of potential joined groups. |
| `groupType` | path | yes | `integer(int32)` | Type of group the supplied member applied. |
| `membershipId` | path | yes | `integer(int64)` | Membership ID to for which to find applied groups. |
| `membershipType` | path | yes | `integer(int32)` | Membership type of the supplied membership ID. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/User/{membershipType}/{membershipId}/{filter}/{groupType}/

Tags: GroupV2

Operation ID: `GroupV2.GetGroupsForMember`

Get information about the groups that a given member has joined.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `filter` | path | yes | `integer(int32)` | Filter apply to list of joined groups. |
| `groupType` | path | yes | `integer(int32)` | Type of group the supplied member founded. |
| `membershipId` | path | yes | `integer(int64)` | Membership ID to for which to find founded groups. |
| `membershipType` | path | yes | `integer(int32)` | Membership type of the supplied membership ID. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/{groupId}/

Tags: GroupV2

Operation ID: `GroupV2.GetGroup`

Get information about a specific group of the given ID.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | Requested group's id. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Admin/AbdicateFoundership/{membershipType}/{founderIdNew}/

Tags: GroupV2

Operation ID: `GroupV2.AbdicateFoundership`

An administrative method to allow the founder of a group or clan to give up their position to another admin permanently.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `founderIdNew` | path | yes | `integer(int64)` | The new founder for this group. Must already be a group admin. |
| `groupId` | path | yes | `integer(int64)` | The target group id. |
| `membershipType` | path | yes | `integer(int32)` | Membership type of the provided founderIdNew. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/{groupId}/AdminsAndFounder/

Tags: GroupV2

Operation ID: `GroupV2.GetAdminsAndFounderOfGroup`

Get the list of members in a given group who are of admin level or higher.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `currentpage` | path | yes | `integer(int32)` | Page number (starting with 1). Each page has a fixed size of 50 items per page. |
| `groupId` | path | yes | `integer(int64)` | The ID of the group. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/{groupId}/Banned/

Tags: GroupV2

Operation ID: `GroupV2.GetBannedMembersOfGroup`

Get the list of banned members in a given group. Only accessible to group Admins and above. Not applicable to all groups. Check group features.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `currentpage` | path | yes | `integer(int32)` | Page number (starting with 1). Each page has a fixed size of 50 entries. |
| `groupId` | path | yes | `integer(int64)` | Group ID whose banned members you are fetching |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Edit/

Tags: GroupV2

Operation ID: `GroupV2.EditGroup`

Edit an existing group. You must have suitable permissions in the group to perform this operation. This latest revision will only edit the fields you pass in - pass null for properties you want to leave unaltered.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | Group ID of the group to edit. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/EditClanBanner/

Tags: GroupV2

Operation ID: `GroupV2.EditClanBanner`

Edit an existing group's clan banner. You must have suitable permissions in the group to perform this operation. All fields are required.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | Group ID of the group to edit. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/EditFounderOptions/

Tags: GroupV2

Operation ID: `GroupV2.EditFounderOptions`

Edit group options only available to a founder. You must have suitable permissions in the group to perform this operation.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | Group ID of the group to edit. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/{groupId}/EditHistory/

Tags: GroupV2

Operation ID: `GroupV2.GetGroupEditHistory`

Get the list of edits made to a given group. Only accessible to group Admins and above.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `currentpage` | path | yes | `integer(int32)` | Page number (starting with 1). Each page has a fixed size of 50 entries. |
| `groupId` | path | yes | `integer(int64)` | Group ID whose edit history you are fetching |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/{groupId}/Members/

Tags: GroupV2

Operation ID: `GroupV2.GetMembersOfGroup`

Get the list of members in a given group.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `currentpage` | path | yes | `integer(int32)` | Page number (starting with 1). Each page has a fixed size of 50 items per page. |
| `groupId` | path | yes | `integer(int64)` | The ID of the group. |
| `memberType` | query | no | `integer(int32)` | Filter out other member types. Use None for all members. |
| `nameSearch` | query | no | `string` | The name fragment upon which a search should be executed for members with matching display or unique names. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Members/Approve/{membershipType}/{membershipId}/

Tags: GroupV2

Operation ID: `GroupV2.ApprovePending`

Approve the given membershipId to join the group/clan as long as they have applied.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | ID of the group. |
| `membershipId` | path | yes | `integer(int64)` | The membership id being approved. |
| `membershipType` | path | yes | `integer(int32)` | Membership type of the supplied membership ID. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Members/ApproveAll/

Tags: GroupV2

Operation ID: `GroupV2.ApproveAllPending`

Approve all of the pending users for the given group.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | ID of the group. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Members/ApproveList/

Tags: GroupV2

Operation ID: `GroupV2.ApprovePendingForList`

Approve all of the pending users for the given group.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | ID of the group. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Members/DenyAll/

Tags: GroupV2

Operation ID: `GroupV2.DenyAllPending`

Deny all of the pending users for the given group.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | ID of the group. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Members/DenyList/

Tags: GroupV2

Operation ID: `GroupV2.DenyPendingForList`

Deny all of the pending users for the given group that match the passed-in .

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | ID of the group. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Members/IndividualInvite/{membershipType}/{membershipId}/

Tags: GroupV2

Operation ID: `GroupV2.IndividualGroupInvite`

Invite a user to join this group.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | ID of the group you would like to join. |
| `membershipId` | path | yes | `integer(int64)` | Membership id of the account being invited. |
| `membershipType` | path | yes | `integer(int32)` | MembershipType of the account being invited. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Members/IndividualInviteCancel/{membershipType}/{membershipId}/

Tags: GroupV2

Operation ID: `GroupV2.IndividualGroupInviteCancel`

Cancels a pending invitation to join a group.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | ID of the group you would like to join. |
| `membershipId` | path | yes | `integer(int64)` | Membership id of the account being cancelled. |
| `membershipType` | path | yes | `integer(int32)` | MembershipType of the account being cancelled. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/{groupId}/Members/InvitedIndividuals/

Tags: GroupV2

Operation ID: `GroupV2.GetInvitedIndividuals`

Get the list of users who have been invited into the group.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `currentpage` | path | yes | `integer(int32)` | Page number (starting with 1). Each page has a fixed size of 50 items per page. |
| `groupId` | path | yes | `integer(int64)` | ID of the group. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/{groupId}/Members/Pending/

Tags: GroupV2

Operation ID: `GroupV2.GetPendingMemberships`

Get the list of users who are awaiting a decision on their application to join a given group. Modified to include application info.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `currentpage` | path | yes | `integer(int32)` | Page number (starting with 1). Each page has a fixed size of 50 items per page. |
| `groupId` | path | yes | `integer(int64)` | ID of the group. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Members/{membershipType}/{membershipId}/Ban/

Tags: GroupV2

Operation ID: `GroupV2.BanMember`

Bans the requested member from the requested group for the specified period of time.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | Group ID that has the member to ban. |
| `membershipId` | path | yes | `integer(int64)` | Membership ID of the member to ban from the group. |
| `membershipType` | path | yes | `integer(int32)` | Membership type of the provided membership ID. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Members/{membershipType}/{membershipId}/Kick/

Tags: GroupV2

Operation ID: `GroupV2.KickMember`

Kick a member from the given group, forcing them to reapply if they wish to re-join the group. You must have suitable permissions in the group to perform this operation.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | Group ID to kick the user from. |
| `membershipId` | path | yes | `integer(int64)` | Membership ID to kick. |
| `membershipType` | path | yes | `integer(int32)` | Membership type of the provided membership ID. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Members/{membershipType}/{membershipId}/SetMembershipType/{memberType}/

Tags: GroupV2

Operation ID: `GroupV2.EditGroupMembership`

Edit the membership type of a given member. You must have suitable permissions in the group to perform this operation.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | ID of the group to which the member belongs. |
| `membershipId` | path | yes | `integer(int64)` | Membership ID to modify. |
| `membershipType` | path | yes | `integer(int32)` | Membership type of the provide membership ID. |
| `memberType` | path | yes | `integer(int32)` | New membertype for the specified member. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/Members/{membershipType}/{membershipId}/Unban/

Tags: GroupV2

Operation ID: `GroupV2.UnbanMember`

Unbans the requested member, allowing them to re-apply for membership.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` |  |
| `membershipId` | path | yes | `integer(int64)` | Membership ID of the member to unban from the group |
| `membershipType` | path | yes | `integer(int32)` | Membership type of the provided membership ID. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /GroupV2/{groupId}/OptionalConversations/

Tags: GroupV2

Operation ID: `GroupV2.GetGroupOptionalConversations`

Gets a list of available optional conversation channels and their settings.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | Requested group's id. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/OptionalConversations/Add/

Tags: GroupV2

Operation ID: `GroupV2.AddOptionalConversation`

Add a new optional conversation/chat channel. Requires admin permissions to the group.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `groupId` | path | yes | `integer(int64)` | Group ID of the group to edit. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /GroupV2/{groupId}/OptionalConversations/Edit/{conversationId}/

Tags: GroupV2

Operation ID: `GroupV2.EditOptionalConversation`

Edit the settings of an optional conversation/chat channel. Requires admin permissions to the group.

Security: oauth2(AdminGroups)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `conversationId` | path | yes | `integer(int64)` | Conversation Id of the channel being edited. |
| `groupId` | path | yes | `integer(int64)` | Group ID of the group to edit. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Settings/

Tags: 

Operation ID: `.GetCommonSettings`

Get the common settings used by the Bungie.Net environment.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Social/Friends/

Tags: Social

Operation ID: `Social.GetFriendList`

Returns your Bungie Friend list

Security: oauth2(ReadUserData)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Social/Friends/Add/{membershipId}/

Tags: Social

Operation ID: `Social.IssueFriendRequest`

Requests a friend relationship with the target user. Any of the target user's linked membership ids are valid inputs.

Security: oauth2(BnetWrite)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `membershipId` | path | yes | `string` | The membership id of the user you wish to add. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Social/Friends/Remove/{membershipId}/

Tags: Social

Operation ID: `Social.RemoveFriend`

Remove a friend relationship with the target user. The user must be on your friend list, though no error will occur if they are not.

Security: oauth2(BnetWrite)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `membershipId` | path | yes | `string` | The membership id of the user you wish to remove. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Social/Friends/Requests/

Tags: Social

Operation ID: `Social.GetFriendRequestList`

Returns your friend request queue.

Security: oauth2(ReadUserData)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Social/Friends/Requests/Accept/{membershipId}/

Tags: Social

Operation ID: `Social.AcceptFriendRequest`

Accepts a friend relationship with the target user. The user must be on your incoming friend request list, though no error will occur if they are not.

Security: oauth2(BnetWrite)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `membershipId` | path | yes | `string` | The membership id of the user you wish to accept. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Social/Friends/Requests/Decline/{membershipId}/

Tags: Social

Operation ID: `Social.DeclineFriendRequest`

Declines a friend relationship with the target user. The user must be on your incoming friend request list, though no error will occur if they are not.

Security: oauth2(BnetWrite)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `membershipId` | path | yes | `string` | The membership id of the user you wish to decline. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Social/Friends/Requests/Remove/{membershipId}/

Tags: Social

Operation ID: `Social.RemoveFriendRequest`

Remove a friend relationship with the target user. The user must be on your outgoing request friend list, though no error will occur if they are not.

Security: oauth2(BnetWrite)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `membershipId` | path | yes | `string` | The membership id of the user you wish to remove. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Social/PlatformFriends/{friendPlatform}/{page}/

Tags: Social

Operation ID: `Social.GetPlatformFriendList`

Gets the platform friend of the requested type, with additional information if they have Bungie accounts. Must have a recent login session with said platform.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `friendPlatform` | path | yes | `integer(int32)` | The platform friend type. |
| `page` | path | yes | `string` | The zero based page to return. Page size is 100. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Tokens/Partner/ApplyMissingOffers/{partnerApplicationId}/{targetBnetMembershipId}/

Tags: Tokens

Operation ID: `Tokens.ApplyMissingPartnerOffersWithoutClaim`

Apply a partner offer to the targeted user. This endpoint does not claim a new offer, but any already claimed offers will be applied to the game if not already.

Security: oauth2(PartnerOfferGrant)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `partnerApplicationId` | path | yes | `integer(int32)` | The partner application identifier. |
| `targetBnetMembershipId` | path | yes | `integer(int64)` | The bungie.net user to apply missing offers to. If not self, elevated permissions are required. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Tokens/Partner/ClaimOffer/

Tags: Tokens

Operation ID: `Tokens.ClaimPartnerOffer`

Claim a partner offer as the authenticated user.

Security: oauth2(PartnerOfferGrant)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /Tokens/Partner/ForceDropsRepair/

Tags: Tokens

Operation ID: `Tokens.ForceDropsRepair`

Twitch Drops self-repair function - scans twitch for drops not marked as fulfilled and resyncs them.

Security: oauth2(PartnerOfferGrant)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Tokens/Partner/History/{partnerApplicationId}/{targetBnetMembershipId}/

Tags: Tokens

Operation ID: `Tokens.GetPartnerOfferSkuHistory`

Returns the partner sku and offer history of the targeted user. Elevated permissions are required to see users that are not yourself.

Security: oauth2(PartnerOfferGrant)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `partnerApplicationId` | path | yes | `integer(int32)` | The partner application identifier. |
| `targetBnetMembershipId` | path | yes | `integer(int64)` | The bungie.net user to apply missing offers to. If not self, elevated permissions are required. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Tokens/Partner/History/{targetBnetMembershipId}/Application/{partnerApplicationId}/

Tags: Tokens

Operation ID: `Tokens.GetPartnerRewardHistory`

Returns the partner rewards history of the targeted user, both partner offers and Twitch drops.

Security: oauth2(PartnerOfferGrant)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `partnerApplicationId` | path | yes | `integer(int32)` | The partner application identifier. |
| `targetBnetMembershipId` | path | yes | `integer(int64)` | The bungie.net user to return reward history for. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Tokens/Rewards/BungieRewards/

Tags: Tokens

Operation ID: `Tokens.GetBungieRewardsList`

Returns a list of the current bungie rewards

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Tokens/Rewards/GetRewardsForPlatformUser/{membershipId}/{membershipType}/

Tags: Tokens

Operation ID: `Tokens.GetBungieRewardsForPlatformUser`

Returns the bungie rewards for the targeted user when a platform membership Id and Type are used.

Security: oauth2(ReadAndApplyTokens)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `membershipId` | path | yes | `integer(int64)` | users platform membershipId for requested user rewards. If not self, elevated permissions are required. |
| `membershipType` | path | yes | `integer(int32)` | The target Destiny 2 membership type. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Tokens/Rewards/GetRewardsForUser/{membershipId}/

Tags: Tokens

Operation ID: `Tokens.GetBungieRewardsForUser`

Returns the bungie rewards for the targeted user.

Security: oauth2(ReadAndApplyTokens)

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `membershipId` | path | yes | `integer(int64)` | bungie.net user membershipId for requested user rewards. If not self, elevated permissions are required. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Trending/Categories/

Tags: Trending

Operation ID: `Trending.GetTrendingCategories`

Returns trending items for Bungie.net, collapsed into the first page of items per category. For pagination within a category, call GetTrendingCategory.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Trending/Categories/{categoryId}/{pageNumber}/

Tags: Trending

Operation ID: `Trending.GetTrendingCategory`

Returns paginated lists of trending items for a category.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `categoryId` | path | yes | `string` | The ID of the category for whom you want additional results. |
| `pageNumber` | path | yes | `integer(int32)` | The page # of results to return. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /Trending/Details/{trendingEntryType}/{identifier}/

Tags: Trending

Operation ID: `Trending.GetTrendingEntryDetail`

Returns the detailed results for a specific trending entry. Note that trending entries are uniquely identified by a combination of *both* the TrendingEntryType *and* the identifier: the identifier alone is not guaranteed to be globally unique.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `identifier` | path | yes | `string` | The identifier for the entity to be returned. |
| `trendingEntryType` | path | yes | `integer(int32)` | The type of entity to be returned. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /User/GetAvailableThemes/

Tags: User

Operation ID: `User.GetAvailableThemes`

Returns a list of all available user themes.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /User/GetBungieNetUserById/{id}/

Tags: User

Operation ID: `User.GetBungieNetUserById`

Loads a bungienet user by membership id.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | path | yes | `integer(int64)` | The requested Bungie.net membership id. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /User/GetCredentialTypesForTargetAccount/{membershipId}/

Tags: User

Operation ID: `User.GetCredentialTypesForTargetAccount`

Returns a list of credential types attached to the requested account

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `membershipId` | path | yes | `integer(int64)` | The user's membership id |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /User/GetMembershipFromHardLinkedCredential/{crType}/{credential}/

Tags: User

Operation ID: `User.GetMembershipFromHardLinkedCredential`

Gets any hard linked membership given a credential. Only works for credentials that are public (just SteamID64 right now). Cross Save aware.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `credential` | path | yes | `string` | The credential to look up. Must be a valid SteamID64. |
| `crType` | path | yes | `integer(byte)` | The credential type. 'SteamId' is the only valid value at present. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /User/GetMembershipsById/{membershipId}/{membershipType}/

Tags: User

Operation ID: `User.GetMembershipDataById`

Returns a list of accounts associated with the supplied membership ID and membership type. This will include all linked accounts (even when hidden) if supplied credentials permit it.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `membershipId` | path | yes | `integer(int64)` | The membership ID of the target user. |
| `membershipType` | path | yes | `integer(int32)` | Type of the supplied membership ID. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /User/GetMembershipsForCurrentUser/

Tags: User

Operation ID: `User.GetMembershipDataForCurrentUser`

Returns a list of accounts associated with signed in user. This is useful for OAuth implementations that do not give you access to the token response.

Security: oauth2(ReadBasicUserProfile)

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /User/GetSanitizedPlatformDisplayNames/{membershipId}/

Tags: User

Operation ID: `User.GetSanitizedPlatformDisplayNames`

Gets a list of all display names linked to this membership id but sanitized (profanity filtered). Obeys all visibility rules of calling user and is heavily cached.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `membershipId` | path | yes | `integer(int64)` | The requested membership id to load. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### POST /User/Search/GlobalName/{page}/

Tags: User

Operation ID: `User.SearchByGlobalNamePost`

Given the prefix of a global display name, returns all users who share that name.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `page` | path | yes | `integer(int32)` | The zero-based page of results you desire. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /User/Search/Prefix/{displayNamePrefix}/{page}/

Tags: User

Operation ID: `User.SearchByGlobalNamePrefix`

[OBSOLETE] Do not use this to search users, use SearchByGlobalNamePost instead.

#### Parameters

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `displayNamePrefix` | path | yes | `string` | The display name prefix you're looking for. |
| `page` | path | yes | `integer(int32)` | The zero-based page of results you desire. |

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

### GET /UserSystemOverrides/

Tags: 

Operation ID: `.GetUserSystemOverrides`

Get the user-specific system overrides that should be respected alongside common systems.

#### Responses

| Status | Type | Description |
| --- | --- | --- |
| 200 | `object` | Look at the Response property for more information about the nature of this response |

## Definitions

### Applications.ApiUsage

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `apiCalls` | `Applications.Series[]` | no | Counts for on API calls made for the time range. |
| `throttledRequests` | `Applications.Series[]` | no | Instances of blocked requests or requests that crossed the warn threshold during the time range. |

### Applications.Application

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `applicationType` | `integer(int32)` | no |  |
| `applicationId` | `integer(int32)` | no | Unique ID assigned to the application |
| `name` | `string` | no | Name of the application |
| `redirectUrl` | `string` | no | URL used to pass the user's authorization code to the application |
| `link` | `string` | no | Link to website for the application where a user can learn more about the app. |
| `scope` | `integer(int64)` | no | Permissions the application needs to work |
| `origin` | `string` | no | Value of the Origin header sent in requests generated by this application. |
| `status` | `integer(int32)` | no | Current status of the application. |
| `creationDate` | `string(date-time)` | no | Date the application was first added to our database. |
| `statusChanged` | `string(date-time)` | no | Date the application status last changed. |
| `firstPublished` | `string(date-time)` | no | Date the first time the application status entered the 'Public' status. |
| `team` | `Applications.ApplicationDeveloper[]` | no | List of team members who manage this application on Bungie.net. Will always consist of at least the application owner. |
| `overrideAuthorizeViewName` | `string` | no | An optional override for the Authorize view name. |

### Applications.ApplicationDeveloper

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `integer(int32)` | no |  |
| `apiEulaVersion` | `integer(int32)` | no |  |
| `user` | `User.UserInfoCard` | no |  |

### Applications.ApplicationScopes

Type: `integer enum`

Enum values:

- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`
- `128`
- `256`
- `512`
- `1024`
- `2048`
- `4096`
- `8192`
- `16384`

### Applications.ApplicationStatus

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Applications.Datapoint

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `time` | `string(date-time)` | no | Timestamp for the related count. |
| `count` | `number(double)` | no | Count associated with timestamp |

### Applications.DeveloperRole

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Applications.OAuthApplicationType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Applications.Series

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `datapoints` | `Applications.Datapoint[]` | no | Collection of samples with time and value. |
| `target` | `string` | no | Target to which to datapoints apply. |

### BungieCredentialType

The types of credentials the Accounts system supports. This is the external facing enum used in place of the internal-only Bungie.SharedDefinitions.CredentialType.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `8`
- `9`
- `10`
- `12`
- `14`
- `16`
- `18`
- `20`

### BungieMembershipType

The types of membership the Accounts system supports. This is the external facing enum used in place of the internal-only Bungie.SharedDefinitions.MembershipType.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `10`
- `20`
- `254`
- `-1`

### BungieMembershipType[]

Type: `integer(int32)[]`

### Common.Models.CoreSetting

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `identifier` | `string` | no |  |
| `isDefault` | `boolean` | no |  |
| `displayName` | `string` | no |  |
| `summary` | `string` | no |  |
| `imagePath` | `string` | no |  |
| `childSettings` | `Common.Models.CoreSetting[]` | no |  |

### Common.Models.CoreSettingsConfiguration

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `environment` | `string` | no |  |
| `systems` | `object` | no |  |
| `ignoreReasons` | `Common.Models.CoreSetting[]` | no |  |
| `forumCategories` | `Common.Models.CoreSetting[]` | no |  |
| `groupAvatars` | `Common.Models.CoreSetting[]` | no |  |
| `defaultGroupTheme` | `Common.Models.CoreSetting` | no |  |
| `destinyMembershipTypes` | `Common.Models.CoreSetting[]` | no |  |
| `recruitmentPlatformTags` | `Common.Models.CoreSetting[]` | no |  |
| `recruitmentMiscTags` | `Common.Models.CoreSetting[]` | no |  |
| `recruitmentActivities` | `Common.Models.CoreSetting[]` | no |  |
| `userContentLocales` | `Common.Models.CoreSetting[]` | no |  |
| `systemContentLocales` | `Common.Models.CoreSetting[]` | no |  |
| `clanBannerDecals` | `Common.Models.CoreSetting[]` | no |  |
| `clanBannerDecalColors` | `Common.Models.CoreSetting[]` | no |  |
| `clanBannerGonfalons` | `Common.Models.CoreSetting[]` | no |  |
| `clanBannerGonfalonColors` | `Common.Models.CoreSetting[]` | no |  |
| `clanBannerGonfalonDetails` | `Common.Models.CoreSetting[]` | no |  |
| `clanBannerGonfalonDetailColors` | `Common.Models.CoreSetting[]` | no |  |
| `clanBannerStandards` | `Common.Models.CoreSetting[]` | no |  |
| `destiny2CoreSettings` | `Common.Models.Destiny2CoreSettings` | no |  |
| `emailSettings` | `User.EmailSettings` | no |  |
| `fireteamActivities` | `Common.Models.CoreSetting[]` | no |  |

### Common.Models.CoreSystem

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | no |  |
| `parameters` | `object` | no |  |

### Common.Models.Destiny2CoreSettings

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `collectionRootNode` | `integer(uint32)` | no |  |
| `badgesRootNode` | `integer(uint32)` | no |  |
| `recordsRootNode` | `integer(uint32)` | no |  |
| `medalsRootNode` | `integer(uint32)` | no |  |
| `metricsRootNode` | `integer(uint32)` | no |  |
| `activeTriumphsRootNodeHash` | `integer(uint32)` | no |  |
| `activeSealsRootNodeHash` | `integer(uint32)` | no |  |
| `legacyTriumphsRootNodeHash` | `integer(uint32)` | no |  |
| `legacySealsRootNodeHash` | `integer(uint32)` | no |  |
| `medalsRootNodeHash` | `integer(uint32)` | no |  |
| `exoticCatalystsRootNodeHash` | `integer(uint32)` | no |  |
| `loreRootNodeHash` | `integer(uint32)` | no |  |
| `craftingRootNodeHash` | `integer(uint32)` | no |  |
| `globalConstantsHash` | `integer(uint32)` | no |  |
| `loadoutConstantsHash` | `integer(uint32)` | no |  |
| `guardianRankConstantsHash` | `integer(uint32)` | no |  |
| `fireteamFinderConstantsHash` | `integer(uint32)` | no |  |
| `inventoryItemConstantsHash` | `integer(uint32)` | no |  |
| `featuredItemsListHash` | `integer(uint32)` | no |  |
| `armorArchetypePlugSetHash` | `integer(uint32)` | no |  |
| `seasonalHubEventCardHash` | `integer(uint32)` | no |  |
| `guardianRanksRootNodeHash` | `integer(uint32)` | no |  |
| `currentRankProgressionHashes` | `integer(uint32)[]` | no |  |
| `insertPlugFreeProtectedPlugItemHashes` | `integer(uint32)[]` | no |  |
| `insertPlugFreeBlockedSocketTypeHashes` | `integer(uint32)[]` | no |  |
| `enabledFireteamFinderActivityGraphHashes` | `integer(uint32)[]` | no |  |
| `undiscoveredCollectibleImage` | `string` | no |  |
| `ammoTypeHeavyIcon` | `string` | no |  |
| `ammoTypeSpecialIcon` | `string` | no |  |
| `ammoTypePrimaryIcon` | `string` | no |  |
| `currentSeasonalArtifactHash` | `integer(uint32)` | no |  |
| `currentSeasonHash` | `integer(uint32)` | no |  |
| `currentSeasonPassHash` | `integer(uint32)` | no |  |
| `seasonalChallengesPresentationNodeHash` | `integer(uint32)` | no |  |
| `futureSeasonHashes` | `integer(uint32)[]` | no |  |
| `pastSeasonHashes` | `integer(uint32)[]` | no |  |

### Components.ComponentPrivacySetting

A set of flags for reason(s) why the component populated in the way that it did. Inspect the individual flags for the reasons.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Components.ComponentResponse

The base class for any component-returning object that may need to indicate information about the state of the component being returned.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### Config.ClanBanner.ClanBannerDecal

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `identifier` | `string` | no |  |
| `foregroundPath` | `string` | no |  |
| `backgroundPath` | `string` | no |  |

### Config.ClanBanner.ClanBannerSource

Type: `object`

### Config.GroupTheme

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `folder` | `string` | no |  |
| `description` | `string` | no |  |

### Config.UserTheme

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `userThemeId` | `integer(int32)` | no |  |
| `userThemeName` | `string` | no |  |
| `userThemeDescription` | `string` | no |  |

### Content.CommentSummary

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `topicId` | `integer(int64)` | no |  |
| `commentCount` | `integer(int32)` | no |  |

### Content.ContentItemPublicContract

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `contentId` | `integer(int64)` | no |  |
| `cType` | `string` | no |  |
| `cmsPath` | `string` | no |  |
| `creationDate` | `string(date-time)` | no |  |
| `modifyDate` | `string(date-time)` | no |  |
| `allowComments` | `boolean` | no |  |
| `hasAgeGate` | `boolean` | no |  |
| `minimumAge` | `integer(int32)` | no |  |
| `ratingImagePath` | `string` | no |  |
| `author` | `User.GeneralUser` | no |  |
| `autoEnglishPropertyFallback` | `boolean` | no |  |
| `properties` | `object` | no | Firehose content is really a collection of metadata and "properties", which are the potentially-but-not-strictly localizable data that comprises the meat of whatever content is being shown.<br>As Cole Porter would have crooned, "Anything Goes" with Firehose properties. They are most often strings, but they can theoretically be anything. They are JSON encoded, and could be JSON structures, simple strings, numbers etc... The Content Type of the item (cType) will describe the properties, and thus how they ought to be deserialized. |
| `representations` | `Content.ContentRepresentation[]` | no |  |
| `tags` | `string[]` | no | NOTE: Tags will always be lower case. |
| `commentSummary` | `Content.CommentSummary` | no |  |

### Content.ContentRepresentation

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `path` | `string` | no |  |
| `validationString` | `string` | no |  |

### Content.Models.ContentPreview

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `path` | `string` | no |  |
| `itemInSet` | `boolean` | no |  |
| `setTag` | `string` | no |  |
| `setNesting` | `integer(int32)` | no |  |
| `useSetId` | `integer(int32)` | no |  |

### Content.Models.ContentPropertyDataTypeEnum

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`

### Content.Models.ContentTypeDefaultValue

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `whenClause` | `string` | no |  |
| `whenValue` | `string` | no |  |
| `defaultValue` | `string` | no |  |

### Content.Models.ContentTypeDescription

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `cType` | `string` | no |  |
| `name` | `string` | no |  |
| `contentDescription` | `string` | no |  |
| `previewImage` | `string` | no |  |
| `priority` | `integer(int32)` | no |  |
| `reminder` | `string` | no |  |
| `properties` | `Content.Models.ContentTypeProperty[]` | no |  |
| `tagMetadata` | `Content.Models.TagMetadataDefinition[]` | no |  |
| `tagMetadataItems` | `object` | no |  |
| `usageExamples` | `string[]` | no |  |
| `showInContentEditor` | `boolean` | no |  |
| `typeOf` | `string` | no |  |
| `bindIdentifierToProperty` | `string` | no |  |
| `boundRegex` | `string` | no |  |
| `forceIdentifierBinding` | `boolean` | no |  |
| `allowComments` | `boolean` | no |  |
| `autoEnglishPropertyFallback` | `boolean` | no |  |
| `bulkUploadable` | `boolean` | no |  |
| `previews` | `Content.Models.ContentPreview[]` | no |  |
| `suppressCmsPath` | `boolean` | no |  |
| `propertySections` | `Content.Models.ContentTypePropertySection[]` | no |  |

### Content.Models.ContentTypeProperty

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `rootPropertyName` | `string` | no |  |
| `readableName` | `string` | no |  |
| `value` | `string` | no |  |
| `propertyDescription` | `string` | no |  |
| `localizable` | `boolean` | no |  |
| `fallback` | `boolean` | no |  |
| `enabled` | `boolean` | no |  |
| `order` | `integer(int32)` | no |  |
| `visible` | `boolean` | no |  |
| `isTitle` | `boolean` | no |  |
| `required` | `boolean` | no |  |
| `maxLength` | `integer(int32)` | no |  |
| `maxByteLength` | `integer(int32)` | no |  |
| `maxFileSize` | `integer(int32)` | no |  |
| `regexp` | `string` | no |  |
| `validateAs` | `string` | no |  |
| `rssAttribute` | `string` | no |  |
| `visibleDependency` | `string` | no |  |
| `visibleOn` | `string` | no |  |
| `datatype` | `integer(int32)` | no |  |
| `attributes` | `object` | no |  |
| `childProperties` | `Content.Models.ContentTypeProperty[]` | no |  |
| `contentTypeAllowed` | `string` | no |  |
| `bindToProperty` | `string` | no |  |
| `boundRegex` | `string` | no |  |
| `representationSelection` | `object` | no |  |
| `defaultValues` | `Content.Models.ContentTypeDefaultValue[]` | no |  |
| `isExternalAllowed` | `boolean` | no |  |
| `propertySection` | `string` | no |  |
| `weight` | `integer(int32)` | no |  |
| `entitytype` | `string` | no |  |
| `isCombo` | `boolean` | no |  |
| `suppressProperty` | `boolean` | no |  |
| `legalContentTypes` | `string[]` | no |  |
| `representationValidationString` | `string` | no |  |
| `minWidth` | `integer(int32)` | no |  |
| `maxWidth` | `integer(int32)` | no |  |
| `minHeight` | `integer(int32)` | no |  |
| `maxHeight` | `integer(int32)` | no |  |
| `isVideo` | `boolean` | no |  |
| `isImage` | `boolean` | no |  |

### Content.Models.ContentTypePropertySection

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `readableName` | `string` | no |  |
| `collapsed` | `boolean` | no |  |

### Content.Models.TagMetadataDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | no |  |
| `order` | `integer(int32)` | no |  |
| `items` | `Content.Models.TagMetadataItem[]` | no |  |
| `datatype` | `string` | no |  |
| `name` | `string` | no |  |
| `isRequired` | `boolean` | no |  |

### Content.Models.TagMetadataItem

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | no |  |
| `tagText` | `string` | no |  |
| `groups` | `string[]` | no |  |
| `isDefault` | `boolean` | no |  |
| `name` | `string` | no |  |

### Content.NewsArticleRssItem

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `Title` | `string` | no |  |
| `Link` | `string` | no |  |
| `PubDate` | `string(date-time)` | no |  |
| `UniqueIdentifier` | `string` | no |  |
| `Description` | `string` | no |  |
| `HtmlContent` | `string` | no |  |
| `ImagePath` | `string` | no |  |
| `OptionalMobileImagePath` | `string` | no |  |

### Content.NewsArticleRssResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `CurrentPaginationToken` | `integer(int32)` | no |  |
| `NextPaginationToken` | `integer(int32)` | no |  |
| `ResultCountThisPage` | `integer(int32)` | no |  |
| `NewsArticles` | `Content.NewsArticleRssItem[]` | no |  |
| `CategoryFilter` | `string` | no |  |
| `PagerAction` | `string` | no |  |

### Dates.DateRange

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `start` | `string(date-time)` | no |  |
| `end` | `string(date-time)` | no |  |

### Destiny.Activities.DestinyPublicActivityStatus

Represents the public-facing status of an activity: any data about what is currently active in the Activity, regardless of an individual character's progress in it.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `challengeObjectiveHashes` | `integer(uint32)[]` | no | Active Challenges for the activity, if any - represented as hashes for DestinyObjectiveDefinitions. |
| `modifierHashes` | `integer(uint32)[]` | no | The active modifiers on this activity, if any - represented as hashes for DestinyActivityModifierDefinitions. |
| `rewardTooltipItems` | `Destiny.DestinyItemQuantity[]` | no | If the activity itself provides any specific "mock" rewards, this will be the items and their quantity.<br>Why "mock", you ask? Because these are the rewards as they are represented in the tooltip of the Activity.<br>These are often pointers to fake items that look good in a tooltip, but represent an abstract concept of what you will get for a reward rather than the specific items you may obtain. |

### Destiny.ActivityGraphNodeHighlightType

The various known UI styles in which an item can be highlighted. It'll be up to you to determine what you want to show based on this highlighting, BNet doesn't have any assets that correspond to these states. And yeah, RiseOfIron and Comet have their own special highlight states. Don't ask me, I can't imagine they're still used.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Destiny.Advanced.AwaAuthorizationResult

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `userSelection` | `integer(int32)` | no | Indication of how the user responded to the request. If the value is "Approved" the actionToken will contain the token that can be presented when performing the advanced write action. |
| `responseReason` | `integer(int32)` | no |  |
| `developerNote` | `string` | no | Message to the app developer to help understand the response. |
| `actionToken` | `string` | no | Credential used to prove the user authorized an advanced write action. |
| `maximumNumberOfUses` | `integer(int32)` | no | This token may be used to perform the requested action this number of times, at a maximum. If this value is 0, then there is no limit. |
| `validUntil` | `string(date-time)` | no | Time, UTC, when token expires. |
| `type` | `integer(int32)` | no | Advanced Write Action Type from the permission request. |
| `membershipType` | `integer(int32)` | no | MembershipType from the permission request. |

### Destiny.Advanced.AwaInitializeResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `correlationId` | `string` | no | ID used to get the token. Present this ID to the user as it will identify this specific request on their device. |
| `sentToSelf` | `boolean` | no | True if the PUSH message will only be sent to the device that made this request. |

### Destiny.Advanced.AwaPermissionRequested

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `integer(int32)` | no | Type of advanced write action. |
| `affectedItemId` | `integer(int64)` | no | Item instance ID the action shall be applied to. This is optional for all but a new AwaType values. Rule of thumb is to provide the item instance ID if one is available. |
| `membershipType` | `integer(int32)` | no | Destiny membership type of the account to modify. |
| `characterId` | `integer(int64)` | no | Destiny character ID, if applicable, that will be affected by the action. |

### Destiny.Advanced.AwaResponseReason

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.Advanced.AwaType

Type: `integer enum`

Enum values:

- `0`
- `1`

### Destiny.Advanced.AwaUserResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `selection` | `integer(int32)` | no | Indication of the selection the user has made (Approving or rejecting the action) |
| `correlationId` | `string` | no | Correlation ID of the request |
| `nonce` | `string(byte)[]` | no | Secret nonce received via the PUSH notification. |

### Destiny.Advanced.AwaUserSelection

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.Artifacts.DestinyArtifactCharacterScoped

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactHash` | `integer(uint32)` | no |  |
| `pointsUsed` | `integer(int32)` | no |  |
| `resetCount` | `integer(int32)` | no |  |
| `tiers` | `Destiny.Artifacts.DestinyArtifactTier[]` | no |  |

### Destiny.Artifacts.DestinyArtifactProfileScoped

Represents a Seasonal Artifact and all data related to it for the requested Account.
It can be combined with Character-scoped data for a full picture of what a character has available/has chosen, or just these settings can be used for overview information.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactHash` | `integer(uint32)` | no |  |
| `pointProgression` | `Destiny.DestinyProgression` | no |  |
| `pointsAcquired` | `integer(int32)` | no |  |
| `powerBonusProgression` | `Destiny.DestinyProgression` | no |  |
| `powerBonus` | `integer(int32)` | no |  |

### Destiny.Artifacts.DestinyArtifactTier

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `tierHash` | `integer(uint32)` | no |  |
| `isUnlocked` | `boolean` | no |  |
| `pointsToUnlock` | `integer(int32)` | no |  |
| `items` | `Destiny.Artifacts.DestinyArtifactTierItem[]` | no |  |

### Destiny.Artifacts.DestinyArtifactTierItem

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemHash` | `integer(uint32)` | no |  |
| `isActive` | `boolean` | no |  |
| `isVisible` | `boolean` | no |  |

### Destiny.BucketCategory

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Destiny.BucketScope

Type: `integer enum`

Enum values:

- `0`
- `1`

### Destiny.Challenges.DestinyChallengeStatus

Represents the status and other related information for a challenge that is - or was - available to a player. 
A challenge is a bonus objective, generally tacked onto Quests or Activities, that provide additional variations on play.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `objective` | `object` | no | The progress - including completion status - of the active challenge. |

### Destiny.Character.DestinyCharacterCustomization

Raw data about the customization options chosen for a character's face and appearance.
You can look up the relevant class/race/gender combo in DestinyCharacterCustomizationOptionDefinition for the character, and then look up these values within the CustomizationOptions found to pull some data about their choices. Warning: not all of that data is meaningful. Some data has useful icons. Others have nothing, and are only meant for 3D rendering purposes (which we sadly do not expose yet)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `personality` | `integer(uint32)` | no |  |
| `face` | `integer(uint32)` | no |  |
| `skinColor` | `integer(uint32)` | no |  |
| `lipColor` | `integer(uint32)` | no |  |
| `eyeColor` | `integer(uint32)` | no |  |
| `hairColors` | `integer(uint32)[]` | no |  |
| `featureColors` | `integer(uint32)[]` | no |  |
| `decalColor` | `integer(uint32)` | no |  |
| `wearHelmet` | `boolean` | no |  |
| `hairIndex` | `integer(int32)` | no |  |
| `featureIndex` | `integer(int32)` | no |  |
| `decalIndex` | `integer(int32)` | no |  |

### Destiny.Character.DestinyCharacterPeerView

A minimal view of a character's equipped items, for the purpose of rendering a summary screen or showing the character in 3D.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `equipment` | `Destiny.Character.DestinyItemPeerView[]` | no |  |

### Destiny.Character.DestinyItemPeerView

Bare minimum summary information for an item, for the sake of 3D rendering the item.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemHash` | `integer(uint32)` | no | The hash identifier of the item in question. Use it to look up the DestinyInventoryItemDefinition of the item for static rendering data. |
| `dyes` | `Destiny.DyeReference[]` | no | The list of dyes that have been applied to this item. |

### Destiny.Components.Collectibles.DestinyCollectibleComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `integer(int32)` | no |  |

### Destiny.Components.Collectibles.DestinyCollectiblesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `collectibles` | `object` | no |  |
| `collectionCategoriesRootNodeHash` | `integer(uint32)` | no | The hash for the root presentation node definition of Collection categories. |
| `collectionBadgesRootNodeHash` | `integer(uint32)` | no | The hash for the root presentation node definition of Collection Badges. |

### Destiny.Components.Collectibles.DestinyProfileCollectiblesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `recentCollectibleHashes` | `integer(uint32)[]` | no | The list of collectibles determined by the game as having been "recently" acquired. |
| `newnessFlaggedCollectibleHashes` | `integer(uint32)[]` | no | The list of collectibles determined by the game as having been "recently" acquired.<br>The game client itself actually controls this data, so I personally question whether anyone will get much use out of this: because we can't edit this value through the API. But in case anyone finds it useful, here it is. |
| `collectibles` | `object` | no |  |
| `collectionCategoriesRootNodeHash` | `integer(uint32)` | no | The hash for the root presentation node definition of Collection categories. |
| `collectionBadgesRootNodeHash` | `integer(uint32)` | no | The hash for the root presentation node definition of Collection Badges. |

### Destiny.Components.Craftables.DestinyCraftableComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `visible` | `boolean` | no |  |
| `failedRequirementIndexes` | `integer(int32)[]` | no | If the requirements are not met for crafting this item, these will index into the list of failure strings. |
| `sockets` | `Destiny.Components.Craftables.DestinyCraftableSocketComponent[]` | no | Plug item state for the crafting sockets. |

### Destiny.Components.Craftables.DestinyCraftablesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `craftables` | `object` | no | A map of craftable item hashes to craftable item state components. |
| `craftingRootNodeHash` | `integer(uint32)` | no | The hash for the root presentation node definition of craftable item categories. |

### Destiny.Components.Craftables.DestinyCraftableSocketComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `plugSetHash` | `integer(uint32)` | no |  |
| `plugs` | `Destiny.Components.Craftables.DestinyCraftableSocketPlugComponent[]` | no | Unlock state for plugs in the socket plug set definition |

### Destiny.Components.Craftables.DestinyCraftableSocketPlugComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `plugItemHash` | `integer(uint32)` | no |  |
| `failedRequirementIndexes` | `integer(int32)[]` | no | Index into the unlock requirements to display failure descriptions |

### Destiny.Components.Inventory.DestinyCurrenciesComponent

This component provides a quick lookup of every item the requested character has and how much of that item they have.
Requesting this component will allow you to circumvent manually putting together the list of which currencies you have for the purpose of testing currency requirements on an item being purchased, or operations that have costs.
You *could* figure this out yourself by doing a GetCharacter or GetProfile request and forming your own lookup table, but that is inconvenient enough that this feels like a worthwhile (and optional) redundancy. Don't bother requesting it if you have already created your own lookup from prior GetCharacter/GetProfile calls.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemQuantities` | `object` | no | A dictionary - keyed by the item's hash identifier (DestinyInventoryItemDefinition), and whose value is the amount of that item you have across all available inventory buckets for purchasing.<br>This allows you to see whether the requesting character can afford any given purchase/action without having to re-create this list itself. |
| `materialRequirementSetStates` | `object` | no | A map of material requirement hashes and their status information. |

### Destiny.Components.Inventory.DestinyMaterialRequirementSetState

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `materialRequirementSetHash` | `integer(uint32)` | no | The hash identifier of the material requirement set. Use it to look up the DestinyMaterialRequirementSetDefinition. |
| `materialRequirementStates` | `Destiny.Components.Inventory.DestinyMaterialRequirementState[]` | no | The dynamic state values for individual material requirements. |

### Destiny.Components.Inventory.DestinyMaterialRequirementState

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemHash` | `integer(uint32)` | no | The hash identifier of the material required. Use it to look up the material's DestinyInventoryItemDefinition. |
| `count` | `integer(int32)` | no | The amount of the material required. |
| `stackSize` | `integer(int32)` | no | A value for the amount of a (possibly virtual) material on some scope. For example: Dawning cookie baking material requirements. |

### Destiny.Components.Inventory.DestinyPlatformSilverComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `platformSilver` | `object` | no | If a Profile is played on multiple platforms, this is the silver they have for each platform, keyed by Membership Type. |

### Destiny.Components.Items.DestinyItemPlugComponent

Plugs are non-instanced items that can provide Stat and Perk benefits when socketed into an instanced item. Items have Sockets, and Plugs are inserted into Sockets.
This component finds all items that are considered "Plugs" in your inventory, and return information about the plug aside from any specific Socket into which it could be inserted.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `plugObjectives` | `Destiny.Quests.DestinyObjectiveProgress[]` | no | Sometimes, Plugs may have objectives: these are often used for flavor and display purposes, but they can be used for any arbitrary purpose (both fortunately and unfortunately). Recently (with Season 2) they were expanded in use to be used as the "gating" for whether the plug can be inserted at all. For instance, a Plug might be tracking the number of PVP kills you have made. It will use the parent item's data about that tracking status to determine what to show, and will generally show it using the DestinyObjectiveDefinition's progressDescription property. Refer to the plug's itemHash and objective property for more information if you would like to display even more data. |
| `plugItemHash` | `integer(uint32)` | no | The hash identifier of the DestinyInventoryItemDefinition that represents this plug. |
| `canInsert` | `boolean` | no | If true, this plug has met all of its insertion requirements. Big if true. |
| `enabled` | `boolean` | no | If true, this plug will provide its benefits while inserted. |
| `insertFailIndexes` | `integer(int32)[]` | no | If the plug cannot be inserted for some reason, this will have the indexes into the plug item definition's plug.insertionRules property, so you can show the reasons why it can't be inserted.<br>This list will be empty if the plug can be inserted. |
| `enableFailIndexes` | `integer(int32)[]` | no | If a plug is not enabled, this will be populated with indexes into the plug item definition's plug.enabledRules property, so that you can show the reasons why it is not enabled.<br>This list will be empty if the plug is enabled. |
| `stackSize` | `integer(int32)` | no | If available, this is the stack size to display for the socket plug item. |
| `maxStackSize` | `integer(int32)` | no | If available, this is the maximum stack size to display for the socket plug item. |

### Destiny.Components.Items.DestinyItemPlugObjectivesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `objectivesPerPlug` | `object` | no | This set of data is keyed by the Item Hash (DestinyInventoryItemDefinition) of the plug whose objectives are being returned, with the value being the list of those objectives.<br> What if two plugs with the same hash are returned for an item, you ask?<br> Good question! They share the same item-scoped state, and as such would have identical objective state as a result. How's that for convenient.<br> Sometimes, Plugs may have objectives: generally, these are used for flavor and display purposes. For instance, a Plug might be tracking the number of PVP kills you have made. It will use the parent item's data about that tracking status to determine what to show, and will generally show it using the DestinyObjectiveDefinition's progressDescription property. Refer to the plug's itemHash and objective property for more information if you would like to display even more data. |

### Destiny.Components.Items.DestinyItemReusablePlugsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `plugs` | `object` | no | If the item supports reusable plugs, this is the list of plugs that are allowed to be used for the socket, and any relevant information about whether they are "enabled", whether they are allowed to be inserted, and any other information such as objectives.<br> A Reusable Plug is a plug that you can always insert into this socket as long as its insertion rules are passed, regardless of whether or not you have the plug in your inventory. An example of it failing an insertion rule would be if it has an Objective that needs to be completed before it can be inserted, and that objective hasn't been completed yet.<br> In practice, a socket will *either* have reusable plugs *or* it will allow for plugs in your inventory to be inserted. See DestinyInventoryItemDefinition.socket for more info.<br> KEY = The INDEX into the item's list of sockets. VALUE = The set of plugs for that socket.<br> If a socket doesn't have any reusable plugs defined at the item scope, there will be no entry for that socket. |

### Destiny.Components.Kiosks.DestinyKioskItem

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `index` | `integer(int32)` | no | The index of the item in the related DestinyVendorDefintion's itemList property, representing the sale. |
| `canAcquire` | `boolean` | no | If true, the user can not only see the item, but they can acquire it. It is possible that a user can see a kiosk item and not be able to acquire it. |
| `failureIndexes` | `integer(int32)[]` | no | Indexes into failureStrings for the Vendor, indicating the reasons why it failed if any. |
| `flavorObjective` | `object` | no | I may regret naming it this way - but this represents when an item has an objective that doesn't serve a beneficial purpose, but rather is used for "flavor" or additional information. For instance, when Emblems track specific stats, those stats are represented as Objectives on the item. |

### Destiny.Components.Kiosks.DestinyKiosksComponent

A Kiosk is a Vendor (DestinyVendorDefinition) that sells items based on whether you have already acquired that item before.
This component returns information about what Kiosk items are available to you on a *Profile* level. It is theoretically possible for Kiosks to have items gated by specific Character as well. If you ever have those, you will find them on the individual character's DestinyCharacterKiosksComponent.
Note that, because this component returns vendorItemIndexes (that is to say, indexes into the Kiosk Vendor's itemList property), these results are necessarily content version dependent. Make sure that you have the latest version of the content manifest databases before using this data.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `kioskItems` | `object` | no | A dictionary keyed by the Kiosk Vendor's hash identifier (use it to look up the DestinyVendorDefinition for the relevant kiosk vendor), and whose value is a list of all the items that the user can "see" in the Kiosk, and any other interesting metadata. |

### Destiny.Components.Loadouts.DestinyLoadoutComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `colorHash` | `integer(uint32)` | no |  |
| `iconHash` | `integer(uint32)` | no |  |
| `nameHash` | `integer(uint32)` | no |  |
| `items` | `Destiny.Components.Loadouts.DestinyLoadoutItemComponent[]` | no |  |

### Destiny.Components.Loadouts.DestinyLoadoutItemComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemInstanceId` | `integer(int64)` | no |  |
| `plugItemHashes` | `integer(uint32)[]` | no |  |

### Destiny.Components.Loadouts.DestinyLoadoutsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `loadouts` | `Destiny.Components.Loadouts.DestinyLoadoutComponent[]` | no |  |

### Destiny.Components.Metrics.DestinyMetricComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `invisible` | `boolean` | no |  |
| `objectiveProgress` | `Destiny.Quests.DestinyObjectiveProgress` | no |  |

### Destiny.Components.Metrics.DestinyMetricsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `metrics` | `object` | no |  |
| `metricsRootNodeHash` | `integer(uint32)` | no |  |

### Destiny.Components.PlugSets.DestinyPlugSetsComponent

Sockets may refer to a "Plug Set": a set of reusable plugs that may be shared across multiple sockets (or even, in theory, multiple sockets over multiple items).
This is the set of those plugs that we came across in the users' inventory, along with the values for plugs in the set. Any given set in this component may be represented in Character and Profile-level, as some plugs may be Profile-level restricted, and some character-level restricted. (note that the ones that are even more specific will remain on the actual socket component itself, as they cannot be reused)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `plugs` | `object` | no | The shared list of plugs for each relevant PlugSet, keyed by the hash identifier of the PlugSet (DestinyPlugSetDefinition). |

### Destiny.Components.Presentation.DestinyPresentationNodeComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `integer(int32)` | no |  |
| `objective` | `object` | no | An optional property: presentation nodes MAY have objectives, which can be used to infer more human readable data about the progress. However, progressValue and completionValue ought to be considered the canonical values for progress on Progression Nodes. |
| `progressValue` | `integer(int32)` | no | How much of the presentation node is considered to be completed so far by the given character/profile. |
| `completionValue` | `integer(int32)` | no | The value at which the presentation node is considered to be completed. |
| `recordCategoryScore` | `integer(int32)` | no | If available, this is the current score for the record category that this node represents. |

### Destiny.Components.Presentation.DestinyPresentationNodesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `nodes` | `object` | no |  |

### Destiny.Components.Profiles.DestinyProfileProgressionComponent

The set of progression-related information that applies at a Profile-wide level for your Destiny experience. This differs from the Jimi Hendrix Experience because there's less guitars on fire. Yet. #spoileralert?
This will include information such as Checklist info.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `checklists` | `object` | no | The set of checklists that can be examined on a profile-wide basis, keyed by the hash identifier of the Checklist (DestinyChecklistDefinition)<br>For each checklist returned, its value is itself a Dictionary keyed by the checklist's hash identifier with the value being a boolean indicating if it's been discovered yet. |
| `seasonalArtifact` | `object` | no | Data related to your progress on the current season's artifact that is the same across characters. |

### Destiny.Components.Profiles.DestinyProfileTransitoryComponent

This is an experimental set of data that Bungie considers to be "transitory" - information that may be useful for API users, but that is coming from a non-authoritative data source about information that could potentially change at a more frequent pace than Bungie.net will receive updates about it.
This information is provided exclusively for convenience should any of it be useful to users: we provide no guarantees to the accuracy or timeliness of data that comes from this source. Know that this data can potentially be out-of-date or even wrong entirely if the user disconnected from the game or suddenly changed their status before we can receive refreshed data.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `partyMembers` | `Destiny.Components.Profiles.DestinyProfileTransitoryPartyMember[]` | no | If you have any members currently in your party, this is some (very) bare-bones information about those members. |
| `currentActivity` | `object` | no | If you are in an activity, this is some transitory info about the activity currently being played. |
| `joinability` | `object` | no | Information about whether and what might prevent you from joining this person on a fireteam. |
| `tracking` | `Destiny.Components.Profiles.DestinyProfileTransitoryTrackingEntry[]` | no | Information about tracked entities. |
| `lastOrbitedDestinationHash` | `integer(uint32)` | no | The hash identifier for the DestinyDestinationDefinition of the last location you were orbiting when in orbit. |

### Destiny.Components.Profiles.DestinyProfileTransitoryCurrentActivity

If you are playing in an activity, this is some information about it.
Note that we cannot guarantee any of this resembles what ends up in the PGCR in any way. They are sourced by two entirely separate systems with their own logic, and the one we source this data from should be considered non-authoritative in comparison.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `startTime` | `string(date-time)` | no | When the activity started. |
| `endTime` | `string(date-time)` | no | If you're still in it but it "ended" (like when folks are dancing around the loot after they beat a boss), this is when the activity ended. |
| `score` | `number(float)` | no | This is what our non-authoritative source thought the score was. |
| `highestOpposingFactionScore` | `number(float)` | no | If you have human opponents, this is the highest opposing team's score. |
| `numberOfOpponents` | `integer(int32)` | no | This is how many human or poorly crafted aimbot opponents you have. |
| `numberOfPlayers` | `integer(int32)` | no | This is how many human or poorly crafted aimbots are on your team. |

### Destiny.Components.Profiles.DestinyProfileTransitoryJoinability

Some basic information about whether you can be joined, how many slots are left etc. Note that this can change quickly, so it may not actually be useful. But perhaps it will be in some use cases?

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `openSlots` | `integer(int32)` | no | The number of slots still available on this person's fireteam. |
| `privacySetting` | `integer(int32)` | no | Who the person is currently allowing invites from. |
| `closedReasons` | `integer(int32)` | no | Reasons why a person can't join this person's fireteam. |

### Destiny.Components.Profiles.DestinyProfileTransitoryPartyMember

This is some bare minimum information about a party member in a Fireteam. Unfortunately, without great computational expense on our side we can only get at the data contained here. I'd like to give you a character ID for example, but we don't have it. But we do have these three pieces of information. May they help you on your quest to show meaningful data about current Fireteams.
Notably, we don't and can't feasibly return info on characters. If you can, try to use just the data below for your UI and purposes. Only hit us with further queries if you absolutely must know the character ID of the currently playing character. Pretty please with sugar on top.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `membershipId` | `integer(int64)` | no | The Membership ID that matches the party member. |
| `emblemHash` | `integer(uint32)` | no | The identifier for the DestinyInventoryItemDefinition of the player's emblem. |
| `displayName` | `string` | no | The player's last known display name. |
| `status` | `integer(int32)` | no | A Flags Enumeration value indicating the states that the player is in relevant to being on a fireteam. |

### Destiny.Components.Profiles.DestinyProfileTransitoryTrackingEntry

This represents a single "thing" being tracked by the player.
This can point to many types of entities, but only a subset of them will actually have a valid hash identifier for whatever it is being pointed to.
It's up to you to interpret what it means when various combinations of these entries have values being tracked.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `locationHash` | `integer(uint32)` | no | OPTIONAL - If this is tracking a DestinyLocationDefinition, this is the identifier for that location. |
| `itemHash` | `integer(uint32)` | no | OPTIONAL - If this is tracking the status of a DestinyInventoryItemDefinition, this is the identifier for that item. |
| `objectiveHash` | `integer(uint32)` | no | OPTIONAL - If this is tracking the status of a DestinyObjectiveDefinition, this is the identifier for that objective. |
| `activityHash` | `integer(uint32)` | no | OPTIONAL - If this is tracking the status of a DestinyActivityDefinition, this is the identifier for that activity. |
| `questlineItemHash` | `integer(uint32)` | no | OPTIONAL - If this is tracking the status of a quest, this is the identifier for the DestinyInventoryItemDefinition that containst that questline data. |
| `trackedDate` | `string(date-time)` | no | OPTIONAL - I've got to level with you, I don't really know what this is. Is it when you started tracking it? Is it only populated for tracked items that have time limits?<br>I don't know, but we can get at it - when I get time to actually test what it is, I'll update this. In the meantime, bask in the mysterious data. |

### Destiny.Components.Records.DestinyCharacterRecordsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `featuredRecordHashes` | `integer(uint32)[]` | no |  |
| `records` | `object` | no |  |
| `recordCategoriesRootNodeHash` | `integer(uint32)` | no | The hash for the root presentation node definition of Triumph categories. |
| `recordSealsRootNodeHash` | `integer(uint32)` | no | The hash for the root presentation node definition of Triumph Seals. |

### Destiny.Components.Records.DestinyProfileRecordsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `score` | `integer(int32)` | no | Your 'active' Triumphs score, maintained for backwards compatibility. |
| `activeScore` | `integer(int32)` | no | Your 'active' Triumphs score. |
| `legacyScore` | `integer(int32)` | no | Your 'legacy' Triumphs score. |
| `lifetimeScore` | `integer(int32)` | no | Your 'lifetime' Triumphs score. |
| `trackedRecordHash` | `integer(uint32)` | no | If this profile is tracking a record, this is the hash identifier of the record it is tracking. |
| `records` | `object` | no |  |
| `recordCategoriesRootNodeHash` | `integer(uint32)` | no | The hash for the root presentation node definition of Triumph categories. |
| `recordSealsRootNodeHash` | `integer(uint32)` | no | The hash for the root presentation node definition of Triumph Seals. |

### Destiny.Components.Records.DestinyRecordComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `integer(int32)` | no |  |
| `objectives` | `Destiny.Quests.DestinyObjectiveProgress[]` | no |  |
| `intervalObjectives` | `Destiny.Quests.DestinyObjectiveProgress[]` | no |  |
| `intervalsRedeemedCount` | `integer(int32)` | no |  |
| `completedCount` | `integer(int32)` | no | If available, this is the number of times this record has been completed. For example, the number of times a seal title has been gilded. |
| `rewardVisibilty` | `boolean[]` | no | If available, a list that describes which reward rewards should be shown (true) or hidden (false). This property is for regular record rewards, and not for interval objective rewards. |

### Destiny.Components.Records.DestinyRecordsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `records` | `object` | no |  |
| `recordCategoriesRootNodeHash` | `integer(uint32)` | no | The hash for the root presentation node definition of Triumph categories. |
| `recordSealsRootNodeHash` | `integer(uint32)` | no | The hash for the root presentation node definition of Triumph Seals. |

### Destiny.Components.Social.DestinySocialCommendationsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `totalScore` | `integer(int32)` | no |  |
| `commendationNodePercentagesByHash` | `object` | no | The percentage for each commendation type out of total received |
| `scoreDetailValues` | `integer(int32)[]` | no |  |
| `commendationNodeScoresByHash` | `object` | no |  |
| `commendationScoresByHash` | `object` | no |  |

### Destiny.Components.StringVariables.DestinyStringVariablesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `integerValuesByHash` | `object` | no |  |

### Destiny.Components.Vendors.DestinyPublicVendorComponent

This component contains essential/summary information about the vendor from the perspective of a character-agnostic view.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorHash` | `integer(uint32)` | no | The unique identifier for the vendor. Use it to look up their DestinyVendorDefinition. |
| `nextRefreshDate` | `string(date-time)` | no | The date when this vendor's inventory will next rotate/refresh.<br>Note that this is distinct from the date ranges that the vendor is visible/available in-game: this field indicates the specific time when the vendor's available items refresh and rotate, regardless of whether the vendor is actually available at that time. Unfortunately, these two values may be (and are, for the case of important vendors like Xur) different.<br>Issue https://github.com/Bungie-net/api/issues/353 is tracking a fix to start providing visibility date ranges where possible in addition to this refresh date, so that all important dates for vendors are available for use. |
| `enabled` | `boolean` | no | If True, the Vendor is currently accessible. <br>If False, they may not actually be visible in the world at the moment. |

### Destiny.Components.Vendors.DestinyPublicVendorSaleItemComponent

Has character-agnostic information about an item being sold by a vendor.
Note that if you want instance, stats, etc... data for the item, you'll have to request additional components such as ItemInstances, ItemPerks etc... and acquire them from the DestinyVendorResponse's "items" property. For most of these, however, you'll have to ask for it in context of a specific character.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorItemIndex` | `integer(int32)` | no | The index into the DestinyVendorDefinition.itemList property. Note that this means Vendor data *is* Content Version dependent: make sure you have the latest content before you use Vendor data, or these indexes may mismatch. <br>Most systems avoid this problem, but Vendors is one area where we are unable to reasonably avoid content dependency at the moment. |
| `itemHash` | `integer(uint32)` | no | The hash of the item being sold, as a quick shortcut for looking up the DestinyInventoryItemDefinition of the sale item. |
| `overrideStyleItemHash` | `integer(uint32)` | no | If populated, this is the hash of the item whose icon (and other secondary styles, but *not* the human readable strings) should override whatever icons/styles are on the item being sold.<br>If you don't do this, certain items whose styles are being overridden by socketed items - such as the "Recycle Shader" item - would show whatever their default icon/style is, and it wouldn't be pretty or look accurate. |
| `quantity` | `integer(int32)` | no | How much of the item you'll be getting. |
| `costs` | `Destiny.DestinyItemQuantity[]` | no | A summary of the current costs of the item. |
| `overrideNextRefreshDate` | `string(date-time)` | no | If this item has its own custom date where it may be removed from the Vendor's rotation, this is that date.<br>Note that there's not actually any guarantee that it will go away: it could be chosen again and end up still being in the Vendor's sale items! But this is the next date where that test will occur, and is also the date that the game shows for availability on things like Bounties being sold. So it's the best we can give. |
| `apiPurchasable` | `boolean` | no | If true, this item can be purchased through the Bungie.net API. |

### Destiny.Components.Vendors.DestinyVendorBaseComponent

This component contains essential/summary information about the vendor.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorHash` | `integer(uint32)` | no | The unique identifier for the vendor. Use it to look up their DestinyVendorDefinition. |
| `nextRefreshDate` | `string(date-time)` | no | The date when this vendor's inventory will next rotate/refresh.<br>Note that this is distinct from the date ranges that the vendor is visible/available in-game: this field indicates the specific time when the vendor's available items refresh and rotate, regardless of whether the vendor is actually available at that time. Unfortunately, these two values may be (and are, for the case of important vendors like Xur) different.<br>Issue https://github.com/Bungie-net/api/issues/353 is tracking a fix to start providing visibility date ranges where possible in addition to this refresh date, so that all important dates for vendors are available for use. |
| `enabled` | `boolean` | no | If True, the Vendor is currently accessible. <br>If False, they may not actually be visible in the world at the moment. |

### Destiny.Components.Vendors.DestinyVendorGroup

Represents a specific group of vendors that can be rendered in the recommended order.
How do we figure out this order? It's a long story, and will likely get more complicated over time.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorGroupHash` | `integer(uint32)` | no |  |
| `vendorHashes` | `integer(uint32)[]` | no | The ordered list of vendors within a particular group. |

### Destiny.Components.Vendors.DestinyVendorGroupComponent

This component returns references to all of the Vendors in the response, grouped by categorizations that Bungie has deemed to be interesting, in the order in which both the groups and the vendors within that group should be rendered.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `groups` | `Destiny.Components.Vendors.DestinyVendorGroup[]` | no | The ordered list of groups being returned. |

### Destiny.Components.Vendors.DestinyVendorSaleItemBaseComponent

The base class for Vendor Sale Item data. Has a bunch of character-agnostic state about the item being sold.
Note that if you want instance, stats, etc... data for the item, you'll have to request additional components such as ItemInstances, ItemPerks etc... and acquire them from the DestinyVendorResponse's "items" property.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorItemIndex` | `integer(int32)` | no | The index into the DestinyVendorDefinition.itemList property. Note that this means Vendor data *is* Content Version dependent: make sure you have the latest content before you use Vendor data, or these indexes may mismatch. <br>Most systems avoid this problem, but Vendors is one area where we are unable to reasonably avoid content dependency at the moment. |
| `itemHash` | `integer(uint32)` | no | The hash of the item being sold, as a quick shortcut for looking up the DestinyInventoryItemDefinition of the sale item. |
| `overrideStyleItemHash` | `integer(uint32)` | no | If populated, this is the hash of the item whose icon (and other secondary styles, but *not* the human readable strings) should override whatever icons/styles are on the item being sold.<br>If you don't do this, certain items whose styles are being overridden by socketed items - such as the "Recycle Shader" item - would show whatever their default icon/style is, and it wouldn't be pretty or look accurate. |
| `quantity` | `integer(int32)` | no | How much of the item you'll be getting. |
| `costs` | `Destiny.DestinyItemQuantity[]` | no | A summary of the current costs of the item. |
| `overrideNextRefreshDate` | `string(date-time)` | no | If this item has its own custom date where it may be removed from the Vendor's rotation, this is that date.<br>Note that there's not actually any guarantee that it will go away: it could be chosen again and end up still being in the Vendor's sale items! But this is the next date where that test will occur, and is also the date that the game shows for availability on things like Bounties being sold. So it's the best we can give. |
| `apiPurchasable` | `boolean` | no | If true, this item can be purchased through the Bungie.net API. |

### Destiny.Config.DestinyManifest

DestinyManifest is the external-facing contract for just the properties needed by those calling the Destiny Platform.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `version` | `string` | no |  |
| `mobileAssetContentPath` | `string` | no |  |
| `mobileGearAssetDataBases` | `Destiny.Config.GearAssetDataBaseDefinition[]` | no |  |
| `mobileWorldContentPaths` | `object` | no |  |
| `jsonWorldContentPaths` | `object` | no | This points to the generated JSON that contains all the Definitions. Each key is a locale. The value is a path to the aggregated world definitions (warning: large file!) |
| `jsonWorldComponentContentPaths` | `object` | no | This points to the generated JSON that contains all the Definitions. Each key is a locale. The value is a dictionary, where the key is a definition type by name, and the value is the path to the file for that definition. WARNING: This is unsafe and subject to change - do not depend on data in these files staying around long-term. |
| `mobileClanBannerDatabasePath` | `string` | no |  |
| `mobileGearCDN` | `object` | no |  |
| `iconImagePyramidInfo` | `Destiny.Config.ImagePyramidEntry[]` | no | Information about the "Image Pyramid" for Destiny icons. Where possible, we create smaller versions of Destiny icons. These are found as subfolders under the location of the "original/full size" Destiny images, with the same file name and extension as the original image itself. (this lets us avoid sending largely redundant path info with every entity, at the expense of the smaller versions of the image being less discoverable) |

### Destiny.Config.GearAssetDataBaseDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `version` | `integer(int32)` | no |  |
| `path` | `string` | no |  |

### Destiny.Config.ImagePyramidEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no | The name of the subfolder where these images are located. |
| `factor` | `number(float)` | no | The factor by which the original image size has been reduced. |

### Destiny.Constants.DestinyEnvironmentLocationMapping

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `locationHash` | `integer(uint32)` | no | The location that is revealed on the director by this mapping. |
| `activationSource` | `string` | no | A hint that the UI uses to figure out how this location is activated by the player. |
| `itemHash` | `integer(uint32)` | no | If this is populated, it is the item that you must possess for this location to be active because of this mapping. (theoretically, a location can have multiple mappings, and some might require an item while others don't) |
| `objectiveHash` | `integer(uint32)` | no | If this is populated, this is an objective related to the location. |
| `activityHash` | `integer(uint32)` | no | If this is populated, this is the activity you have to be playing in order to see this location appear because of this mapping. (theoretically, a location can have multiple mappings, and some might require you to be in a specific activity when others don't) |

### Destiny.DamageType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`

### Destiny.Definitions.Activities.DestinyActivityDifficultyTierCollectionDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `difficultyTiers` | `Destiny.Definitions.Activities.DestinyActivityDifficultyTierDefinition[]` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Activities.DestinyActivityDifficultyTierDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `recommendedActivityLevelOffset` | `integer(int32)` | no |  |
| `fixedActivitySkulls` | `Destiny.Definitions.Activities.DestinyActivitySkull[]` | no |  |
| `tierType` | `integer(int32)` | no |  |
| `optionalRequiredTrait` | `integer(uint32)` | no |  |
| `activityLevel` | `integer(int32)` | no |  |
| `tierRank` | `integer(int32)` | no |  |
| `minimumFireteamLeaderPower` | `integer(int32)` | no |  |
| `maximumFireteamLeaderPower` | `integer(int32)` | no |  |
| `scoreTimeLimitMultiplier` | `integer(int32)` | no |  |
| `selectableSkullCollectionHashes` | `integer(uint32)[]` | no |  |
| `skullSubcategoryOverrides` | `Destiny.Definitions.Activities.DestinyActivityDifficultyTierSubcategoryOverride[]` | no |  |

### Destiny.Definitions.Activities.DestinyActivityDifficultyTierSubcategoryOverride

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `skullSubcategoryHash` | `integer(uint32)` | no |  |
| `refreshTimeMinutes` | `integer(int32)` | no |  |
| `refreshTimeOffsetMinutes` | `integer(int32)` | no |  |

### Destiny.Definitions.Activities.DestinyActivityFamilyDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `traits` | `integer(uint32)[]` | no |  |
| `disabledSkullCategoryHashes` | `integer(uint32)[]` | no |  |
| `disabledSkullSubcategoryHashes` | `integer(uint32)[]` | no |  |
| `fixedSkullSubcategoryHashes` | `integer(uint32)[]` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Activities.DestinyActivityInteractableDefinition

There are times in every Activity's life when interacting with an object in the world will result in another Activity activating. Well, not every Activity. Just certain ones.
Anyways, this defines a set of interactable components, the activities that they spawn when you interact with them, and the conditions under which they can be interacted with.
Sadly, we don't get any *really* good data for them, like positional data... yet. I have hopes for future data that we could put on this.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `entries` | `Destiny.Definitions.Activities.DestinyActivityInteractableEntryDefinition[]` | no | The possible interactables in this activity interactable definition. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Activities.DestinyActivityInteractableEntryDefinition

Defines a specific interactable and the action that can occur when triggered.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no | The activity that will trigger when you interact with this interactable. |

### Destiny.Definitions.Activities.DestinyActivityLoadoutRestrictionDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `restrictedItemFilterHash` | `integer(uint32)` | no |  |
| `restrictedEquipmentSlotHashes` | `integer(uint32)[]` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Activities.DestinyActivitySelectableSkull

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `requiredTraitHash` | `integer(uint32)` | no |  |
| `requiredTraitExistence` | `boolean` | no |  |
| `isEmptySkull` | `boolean` | no |  |
| `loadoutRestrictionHash` | `integer(uint32)` | no |  |
| `activitySkull` | `Destiny.Definitions.Activities.DestinyActivitySkull` | no |  |

### Destiny.Definitions.Activities.DestinyActivitySelectableSkullCollectionDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `skullSubcategoryHashes` | `integer(uint32)[]` | no |  |
| `selectionType` | `Destiny.Definitions.Activities.DestinyActivitySelectableSkullCollectionSelectionType` | no |  |
| `selectableActivitySkulls` | `Destiny.Definitions.Activities.DestinyActivitySelectableSkull[]` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Activities.DestinyActivitySelectableSkullCollectionSelectionType

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `selectionCount` | `integer(int32)` | no |  |
| `refreshTimeMinutes` | `integer(int32)` | no |  |
| `refreshTimeOffsetMinutes` | `integer(int32)` | no |  |

### Destiny.Definitions.Activities.DestinyActivitySelectableSkullExclusionGroupDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Activities.DestinyActivitySkull

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `hash` | `integer(uint32)` | no |  |
| `skullIdentifierHash` | `integer(uint32)` | no |  |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `skullOptions` | `Destiny.Definitions.Activities.DestinyActivitySkullOption[]` | no |  |
| `dynamicUse` | `integer(int32)` | no |  |
| `modifierPowerContribution` | `integer(int32)` | no |  |
| `modifierMultiplierContribution` | `number(float)` | no |  |
| `skullExclusionGroupHash` | `integer(uint32)` | no |  |
| `hasUi` | `boolean` | no |  |
| `displayDescriptionOverrideForNavMode` | `string` | no |  |
| `activityModifierDisplayCategory` | `integer(int32)` | no |  |
| `activityModifierConnotation` | `integer(int32)` | no |  |
| `displayInNavMode` | `boolean` | no |  |
| `displayInActivitySelection` | `boolean` | no |  |

### Destiny.Definitions.Activities.DestinyActivitySkullCategoryDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Activities.DestinyActivitySkullOption

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `optionHash` | `integer(uint32)` | no |  |
| `stringValue` | `string` | no |  |
| `boolValue` | `boolean` | no |  |
| `integerValue` | `integer(int32)` | no |  |
| `floatValue` | `number(float)` | no |  |
| `minDisplayDifficultyId` | `integer(int32)` | no |  |

### Destiny.Definitions.Activities.DestinyActivitySkullSubcategoryDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `parentSkullCategoryHash` | `integer(uint32)` | no |  |
| `availabilityTierRank` | `integer(int32)` | no |  |
| `defaultSkullHashes` | `integer(uint32)[]` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.ActivityModifiers.DestinyActivityModifierDefinition

Modifiers - in Destiny 1, these were referred to as "Skulls" - are changes that can be applied to an Activity.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `displayInNavMode` | `boolean` | no |  |
| `displayInActivitySelection` | `boolean` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Animations.DestinyAnimationReference

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `animName` | `string` | no |  |
| `animIdentifier` | `string` | no |  |
| `path` | `string` | no |  |

### Destiny.Definitions.Artifacts.DestinyArtifactDefinition

Represents known info about a Destiny Artifact.
We cannot guarantee that artifact definitions will be immutable between seasons - in fact, we've been told that they will be replaced between seasons. But this definition is built both to minimize the amount of lookups for related data that have to occur, and is built in hope that, if this plan changes, we will be able to accommodate it more easily.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | Any basic display info we know about the Artifact. Currently sourced from a related inventory item, but the source of this data is subject to change. |
| `translationBlock` | `object` | no | Any Geometry/3D info we know about the Artifact. Currently sourced from a related inventory item's gearset information, but the source of this data is subject to change. |
| `tiers` | `Destiny.Definitions.Artifacts.DestinyArtifactTierDefinition[]` | no | Any Tier/Rank data related to this artifact, listed in display order.  Currently sourced from a Vendor, but this source is subject to change. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Artifacts.DestinyArtifactTierDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `tierHash` | `integer(uint32)` | no | An identifier, unique within the Artifact, for this specific tier. |
| `displayTitle` | `string` | no | The human readable title of this tier, if any. |
| `progressRequirementMessage` | `string` | no | A string representing the localized minimum requirement text for this Tier, if any. |
| `items` | `Destiny.Definitions.Artifacts.DestinyArtifactTierItemDefinition[]` | no | The items that can be earned within this tier. |
| `minimumUnlockPointsUsedRequirement` | `integer(int32)` | no | The minimum number of "unlock points" that you must have used before you can unlock items from this tier. |

### Destiny.Definitions.Artifacts.DestinyArtifactTierItemDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemHash` | `integer(uint32)` | no | The identifier of the Plug Item unlocked by activating this item in the Artifact. |

### Destiny.Definitions.BreakerTypes.DestinyBreakerTypeDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `enumValue` | `integer(int32)` | no | We have an enumeration for Breaker types for quick reference. This is the current definition's breaker type enum value. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Checklists.DestinyChecklistDefinition

By public demand, Checklists are loose sets of "things to do/things you have done" in Destiny that we were actually able to track. They include easter eggs you find in the world, unique chests you unlock, and other such data where the first time you do it is significant enough to be tracked, and you have the potential to "get them all".
These may be account-wide, or may be per character. The status of these will be returned in related "Checklist" data coming down from API requests such as GetProfile or GetCharacter.
Generally speaking, the items in a checklist can be completed in any order: we return an ordered list which only implies the way we are showing them in our own UI, and you can feel free to alter it as you wish.
Note that, in the future, there will be something resembling the old D1 Record Books in at least some vague form. When that is created, it may be that it will supercede much or all of this Checklist data. It remains to be seen if that will be the case, so for now assume that the Checklists will still exist even after the release of D2: Forsaken.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `viewActionString` | `string` | no | A localized string prompting you to view the checklist. |
| `scope` | `integer(int32)` | no | Indicates whether you will find this checklist on the Profile or Character components. |
| `entries` | `Destiny.Definitions.Checklists.DestinyChecklistEntryDefinition[]` | no | The individual checklist items. Gotta catch 'em all. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Checklists.DestinyChecklistEntryDefinition

The properties of an individual checklist item. Note that almost everything is optional: it is *highly* variable what kind of data we'll actually be able to return: at times we may have no other relationships to entities at all.
Whatever UI you build, do it with the knowledge that any given entry might not actually be able to be associated with some other Destiny entity.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `hash` | `integer(uint32)` | no | The identifier for this Checklist entry. Guaranteed unique only within this Checklist Definition, and not globally/for all checklists. |
| `displayProperties` | `object` | no | Even if no other associations exist, we will give you *something* for display properties. In cases where we have no associated entities, it may be as simple as a numerical identifier. |
| `destinationHash` | `integer(uint32)` | no |  |
| `locationHash` | `integer(uint32)` | no |  |
| `bubbleHash` | `integer(uint32)` | no | Note that a Bubble's hash doesn't uniquely identify a "top level" entity in Destiny. Only the combination of location and bubble can uniquely identify a place in the world of Destiny: so if bubbleHash is populated, locationHash must too be populated for it to have any meaning.<br>You can use this property if it is populated to look up the DestinyLocationDefinition's associated .locationReleases[].activityBubbleName property. |
| `activityHash` | `integer(uint32)` | no |  |
| `itemHash` | `integer(uint32)` | no |  |
| `vendorHash` | `integer(uint32)` | no |  |
| `vendorInteractionIndex` | `integer(int32)` | no |  |
| `scope` | `integer(int32)` | no | The scope at which this specific entry can be computed. |

### Destiny.Definitions.Collectibles.DestinyCollectibleAcquisitionBlock

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `acquireMaterialRequirementHash` | `integer(uint32)` | no |  |
| `acquireTimestampUnlockValueHash` | `integer(uint32)` | no |  |

### Destiny.Definitions.Collectibles.DestinyCollectibleDefinition

Defines a

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `scope` | `integer(int32)` | no | Indicates whether the state of this Collectible is determined on a per-character or on an account-wide basis. |
| `sourceString` | `string` | no | A human readable string for a hint about how to acquire the item. |
| `sourceHash` | `integer(uint32)` | no | This is a hash identifier we are building on the BNet side in an attempt to let people group collectibles by similar sources.<br>I can't promise that it's going to be 100% accurate, but if the designers were consistent in assigning the same source strings to items with the same sources, it *ought to* be. No promises though.<br>This hash also doesn't relate to an actual definition, just to note: we've got nothing useful other than the source string for this data. |
| `itemHash` | `integer(uint32)` | no |  |
| `acquisitionInfo` | `Destiny.Definitions.Collectibles.DestinyCollectibleAcquisitionBlock` | no |  |
| `stateInfo` | `Destiny.Definitions.Collectibles.DestinyCollectibleStateBlock` | no |  |
| `presentationInfo` | `Destiny.Definitions.Presentation.DestinyPresentationChildBlock` | no |  |
| `presentationNodeType` | `integer(int32)` | no |  |
| `traitIds` | `string[]` | no |  |
| `traitHashes` | `integer(uint32)[]` | no |  |
| `parentNodeHashes` | `integer(uint32)[]` | no | A quick reference to presentation nodes that have this node as a child. Presentation nodes can be parented under multiple parents. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Collectibles.DestinyCollectibleStateBlock

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `obscuredOverrideItemHash` | `integer(uint32)` | no |  |
| `requirements` | `Destiny.Definitions.Presentation.DestinyPresentationNodeRequirementsBlock` | no |  |

### Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition

Many Destiny*Definition contracts - the "first order" entities of Destiny that have their own tables in the Manifest Database - also have displayable information. This is the base class for that display information.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | no |  |
| `name` | `string` | no |  |
| `icon` | `string` | no | Note that "icon" is sometimes misleading, and should be interpreted in the context of the entity. For instance, in Destiny 1 the DestinyRecordBookDefinition's icon was a big picture of a book.<br>But usually, it will be a small square image that you can use as... well, an icon.<br>They are currently represented as 96px x 96px images. |
| `iconHash` | `integer(uint32)` | no |  |
| `iconSequences` | `Destiny.Definitions.Common.DestinyIconSequenceDefinition[]` | no |  |
| `highResIcon` | `string` | no | If this item has a high-res icon (at least for now, many things won't), then the path to that icon will be here. |
| `hasIcon` | `boolean` | no |  |

### Destiny.Definitions.Common.DestinyGlobalConstantsDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `pathfinderConstants` | `object` | no | Assorted constants for Pathfinder objectives |
| `collectionsRootNodeHash` | `integer(uint32)` | no |  |
| `collectionBadgesRootNodeHash` | `integer(uint32)` | no |  |
| `activeTriumphsRootNodeHash` | `integer(uint32)` | no |  |
| `activeSealsRootNodeHash` | `integer(uint32)` | no |  |
| `legacyTriumphsRootNodeHash` | `integer(uint32)` | no |  |
| `legacySealsRootNodeHash` | `integer(uint32)` | no |  |
| `medalsRootNodeHash` | `integer(uint32)` | no |  |
| `exoticCatalystsRootNodeHash` | `integer(uint32)` | no |  |
| `loreRootNodeHash` | `integer(uint32)` | no |  |
| `metricsRootNodeHash` | `integer(uint32)` | no |  |
| `craftingRootNodeHash` | `integer(uint32)` | no |  |
| `guardianRanksRootNodeHash` | `integer(uint32)` | no |  |
| `seasonalHubEventCardHash` | `integer(uint32)` | no |  |
| `destinyRewardPassRankSealImages` | `Destiny.Definitions.Common.DestinyRewardPassRankSealImages` | no |  |
| `destinySeasonalHubRankIconImages` | `Destiny.Definitions.Common.DestinySeasonalHubRankIconImages` | no |  |
| `armorArchetypePlugSetHash` | `integer(uint32)` | no |  |
| `featuredItemsListHash` | `integer(uint32)` | no |  |
| `portalActivityGraphRootNodesWithIcons` | `object` | no |  |
| `orderRewardsUnlockValueHashesToRewardItemHashes` | `object` | no |  |
| `questItemTraitToFeaturedQuestImagePath` | `object` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Common.DestinyIconSequenceDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `frames` | `string[]` | no |  |

### Destiny.Definitions.Common.DestinyPathfinderConstantsDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `thePaleHeartPathfinderRootNodeHash` | `integer(uint32)` | no | Pathfinder root node for The Pale Heart |
| `allPathfinderRootNodeHashes` | `integer(uint32)[]` | no | Root presentation nodes for all currently valid Pathfinder boards |
| `pathfinderTreeTiers` | `object` | no | The current shape of Pathfinder boards, where a Pathfinder board is stored as as flat list of Records. The key of this dictionary is the index at which a tier starts, and the value is the total number of objectives in the tier. |
| `pathfinderTopology` | `object` | no | The topology of the Pathfinder board. The key is the index of the Record in the Pathfinder board, and the value is a list of the indices of Records that are connected to the Key Record. Using this topology, clients can ascertain if a Record can be unlocked, by checking if the objective of any connected Record has been completed and/or claimed. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Common.DestinyPositionDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `x` | `integer(int32)` | no |  |
| `y` | `integer(int32)` | no |  |
| `z` | `integer(int32)` | no |  |

### Destiny.Definitions.Common.DestinyRewardPassRankSealImages

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `rewardPassRankSealImagePath` | `string` | no |  |
| `rewardPassRankSealPremiumImagePath` | `string` | no |  |
| `rewardPassRankSealPrestigeImagePath` | `string` | no |  |
| `rewardPassRankSealPremiumPrestigeImagePath` | `string` | no |  |

### Destiny.Definitions.Common.DestinySeasonalHubRankIconImages

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `seasonalHubRankIconUnearned` | `string` | no |  |
| `seasonalHubRankIconEarning` | `string` | no |  |
| `seasonalHubRankIconActive` | `string` | no |  |

### Destiny.Definitions.DestinyActivityChallengeDefinition

Represents a reference to a Challenge, which for now is just an Objective.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `objectiveHash` | `integer(uint32)` | no | The hash for the Objective that matches this challenge. Use it to look up the DestinyObjectiveDefinition. |
| `dummyRewards` | `Destiny.DestinyItemQuantity[]` | no | The rewards as they're represented in the UI. Note that they generally link to "dummy" items that give a summary of rewards rather than direct, real items themselves.<br>If the quantity is 0, don't show the quantity. |

### Destiny.Definitions.DestinyActivityCuratorBlockDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `quickplaySortPriority` | `integer(int32)` | no | Sort order |
| `quickplaySortToFront` | `boolean` | no | Whether this activity should be sorted to the front of the Portal category |

### Destiny.Definitions.DestinyActivityDefinition

The static data about Activities in Destiny 2.
Note that an Activity must be combined with an ActivityMode to know - from a Gameplay perspective - what the user is "Playing".
In most PvE activities, this is fairly straightforward. A Story Activity can only be played in the Story Activity Mode.
However, in PvP activities, the Activity alone only tells you the map being played, or the Playlist that the user chose to enter. You'll need to know the Activity Mode they're playing to know that they're playing Mode X on Map Y.
Activity Definitions tell a great deal of information about what *could* be relevant to a user: what rewards they can earn, what challenges could be performed, what modifiers could be applied. To figure out which of these properties is actually live, you'll need to combine the definition with "Live" data from one of the Destiny endpoints.
Activities also have Activity Types, but unfortunately in Destiny 2 these are even less reliable of a source of information than they were in Destiny 1. I will be looking into ways to provide more reliable sources for type information as time goes on, but for now we're going to have to deal with the limitations. See DestinyActivityTypeDefinition for more information.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | The title, subtitle, and icon for the activity. We do a little post-processing on this to try and account for Activities where the designers have left this data too minimal to determine what activity is actually being played. |
| `originalDisplayProperties` | `object` | no | The unadulterated form of the display properties, as they ought to be shown in the Director (if the activity appears in the director). |
| `selectionScreenDisplayProperties` | `object` | no | The title, subtitle, and icon for the activity as determined by Selection Screen data, if there is any for this activity. There won't be data in this field if the activity is never shown in a selection/options screen. |
| `releaseIcon` | `string` | no | If the activity has an icon associated with a specific release (such as a DLC), this is the path to that release's icon. |
| `releaseTime` | `integer(int32)` | no | If the activity will not be visible until a specific and known time, this will be the seconds since the Epoch when it will become visible. |
| `activityLightLevel` | `integer(int32)` | no | The recommended light level for this activity. |
| `destinationHash` | `integer(uint32)` | no | The hash identifier for the Destination on which this Activity is played. Use it to look up the DestinyDestinationDefinition for human readable info about the destination. A Destination can be thought of as a more specific location than a "Place". For instance, if the "Place" is Earth, the "Destination" would be a specific city or region on Earth. |
| `placeHash` | `integer(uint32)` | no | The hash identifier for the "Place" on which this Activity is played. Use it to look up the DestinyPlaceDefinition for human readable info about the Place. A Place is the largest-scoped concept for location information. For instance, if the "Place" is Earth, the "Destination" would be a specific city or region on Earth. |
| `activityTypeHash` | `integer(uint32)` | no | The hash identifier for the Activity Type of this Activity. You may use it to look up the DestinyActivityTypeDefinition for human readable info, but be forewarned: Playlists and many PVP Map Activities will map to generic Activity Types. You'll have to use your knowledge of the Activity Mode being played to get more specific information about what the user is playing. |
| `tier` | `integer(int32)` | no | The difficulty tier of the activity. |
| `pgcrImage` | `string` | no | When Activities are completed, we generate a "Post-Game Carnage Report", or PGCR, with details about what happened in that activity (how many kills someone got, which team won, etc...) We use this image as the background when displaying PGCR information, and often use it when we refer to the Activity in general. |
| `rewards` | `Destiny.Definitions.DestinyActivityRewardDefinition[]` | no | The expected possible rewards for the activity. These rewards may or may not be accessible for an individual player based on their character state, the account state, and even the game's state overall. But it is a useful reference for possible rewards you can earn in the activity. These match up to rewards displayed when you hover over the Activity in the in-game Director, and often refer to Placeholder or "Dummy" items: items that tell you what you can earn in vague terms rather than what you'll specifically be earning (partly because the game doesn't even know what you'll earn specifically until you roll for it at the end) |
| `modifiers` | `Destiny.Definitions.DestinyActivityModifierReferenceDefinition[]` | no | Activities can have Modifiers, as defined in DestinyActivityModifierDefinition. These are references to the modifiers that *can* be applied to that activity, along with data that we use to determine if that modifier is actually active at any given point in time. |
| `isPlaylist` | `boolean` | no | If True, this Activity is actually a Playlist that refers to multiple possible specific Activities and Activity Modes. For instance, a Crucible Playlist may have references to multiple Activities (Maps) with multiple Activity Modes (specific PvP gameplay modes). If this is true, refer to the playlistItems property for the specific entries in the playlist. |
| `challenges` | `Destiny.Definitions.DestinyActivityChallengeDefinition[]` | no | An activity can have many Challenges, of which any subset of them may be active for play at any given period of time. This gives the information about the challenges and data that we use to understand when they're active and what rewards they provide. Sadly, at the moment there's no central definition for challenges: much like "Skulls" were in Destiny 1, these are defined on individual activities and there can be many duplicates/near duplicates across the Destiny 2 ecosystem. I have it in mind to centralize these in a future revision of the API, but we are out of time. |
| `optionalUnlockStrings` | `Destiny.Definitions.DestinyActivityUnlockStringDefinition[]` | no | If there are status strings related to the activity and based on internal state of the game, account, or character, then this will be the definition of those strings and the states needed in order for the strings to be shown. |
| `activityFamilyHashes` | `integer(uint32)[]` | no |  |
| `traitHashes` | `integer(uint32)[]` | no |  |
| `requirements` | `Destiny.Definitions.DestinyActivityRequirementsBlock` | no |  |
| `difficultyTierCollectionHash` | `integer(uint32)` | no |  |
| `selectableSkullCollectionHashes` | `integer(uint32)[]` | no |  |
| `selectableSkullCollections` | `Destiny.Definitions.DestinyActivitySelectableSkullCollections[]` | no |  |
| `playlistItems` | `Destiny.Definitions.DestinyActivityPlaylistItemDefinition[]` | no | Represents all of the possible activities that could be played in the Playlist, along with information that we can use to determine if they are active at the present time. |
| `activityGraphList` | `Destiny.Definitions.DestinyActivityGraphListEntryDefinition[]` | no | Unfortunately, in practice this is almost never populated. In theory, this is supposed to tell which Activity Graph to show if you bring up the director while in this activity. |
| `matchmaking` | `object` | no | This block of data provides information about the Activity's matchmaking attributes: how many people can join and such. |
| `guidedGame` | `object` | no | This block of data, if it exists, provides information about the guided game experience and restrictions for this activity. If it doesn't exist, the game is not able to be played as a guided game. |
| `directActivityModeHash` | `integer(uint32)` | no | If this activity had an activity mode directly defined on it, this will be the hash of that mode. |
| `directActivityModeType` | `integer(int32)` | no | If the activity had an activity mode directly defined on it, this will be the enum value of that mode. |
| `loadouts` | `Destiny.Definitions.DestinyActivityLoadoutRequirementSet[]` | no | The set of all possible loadout requirements that could be active for this activity. Only one will be active at any given time, and you can discover which one through activity-associated data such as Milestones that have activity info on them. |
| `activityModeHashes` | `integer(uint32)[]` | no | The hash identifiers for Activity Modes relevant to this activity.  Note that if this is a playlist, the specific playlist entry chosen will determine the actual activity modes that end up being relevant. |
| `activityModeTypes` | `integer(int32)[]` | no | The activity modes - if any - in enum form. Because we can't seem to escape the enums. |
| `isPvP` | `boolean` | no | If true, this activity is a PVP activity or playlist. |
| `insertionPoints` | `Destiny.Definitions.DestinyActivityInsertionPointDefinition[]` | no | The list of phases or points of entry into an activity, along with information we can use to determine their gating and availability. |
| `activityLocationMappings` | `Destiny.Constants.DestinyEnvironmentLocationMapping[]` | no | A list of location mappings that are affected by this activity. Pulled out of DestinyLocationDefinitions for our/your lookup convenience. |
| `curatorBlockDefinition` | `object` | no | Additional data used for display in the in-game Portal screen |
| `durationEstimate` | `object` | no | Optional estimated duration, shown on the Portal tiles |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyActivityDurationEstimate

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `durationPipsFilledCount` | `integer(int32)` | no | The number of filled pips shown on the Portal tile |
| `durationPipsTotalCount` | `integer(int32)` | no | The total number of pips shown on the Portal tile |
| `durationEstimateText` | `string` | no | The text string showing the estimated time to complete this activity |

### Destiny.Definitions.DestinyActivityGraphListEntryDefinition

Destinations and Activities may have default Activity Graphs that should be shown when you bring up the Director and are playing in either.
This contract defines the graph referred to and the gating for when it is relevant.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityGraphHash` | `integer(uint32)` | no | The hash identifier of the DestinyActivityGraphDefinition that should be shown when opening the director. |

### Destiny.Definitions.DestinyActivityGuidedBlockDefinition

Guided Game information for this activity.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `guidedMaxLobbySize` | `integer(int32)` | no | The maximum amount of people that can be in the waiting lobby. |
| `guidedMinLobbySize` | `integer(int32)` | no | The minimum amount of people that can be in the waiting lobby. |
| `guidedDisbandCount` | `integer(int32)` | no | If -1, the guided group cannot be disbanded. Otherwise, take the total # of players in the activity and subtract this number: that is the total # of votes needed for the guided group to disband. |

### Destiny.Definitions.DestinyActivityInsertionPointDefinition

A point of entry into an activity, gated by an unlock flag and with some more-or-less useless (for our purposes) phase information. I'm including it in case we end up being able to bolt more useful information onto it in the future.
UPDATE: Turns out this information isn't actually useless, and is in fact actually useful for people. Who would have thought? We still don't have localized info for it, but at least this will help people when they're looking at phase indexes in stats data, or when they want to know what phases have been completed on a weekly achievement.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `phaseHash` | `integer(uint32)` | no | A unique hash value representing the phase. This can be useful for, for example, comparing how different instances of Raids have phases in different orders! |

### Destiny.Definitions.DestinyActivityLoadoutRequirement

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `equipmentSlotHash` | `integer(uint32)` | no |  |
| `allowedEquippedItemHashes` | `integer(uint32)[]` | no |  |
| `allowedWeaponSubTypes` | `integer(int32)[]` | no |  |

### Destiny.Definitions.DestinyActivityLoadoutRequirementSet

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `requirements` | `Destiny.Definitions.DestinyActivityLoadoutRequirement[]` | no | The set of requirements that will be applied on the activity if this requirement set is active. |

### Destiny.Definitions.DestinyActivityMatchmakingBlockDefinition

Information about matchmaking and party size for the activity.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `isMatchmade` | `boolean` | no | If TRUE, the activity is matchmade. Otherwise, it requires explicit forming of a party. |
| `minParty` | `integer(int32)` | no | The minimum # of people in the fireteam for the activity to launch. |
| `maxParty` | `integer(int32)` | no | The maximum # of people allowed in a Fireteam. |
| `maxPlayers` | `integer(int32)` | no | The maximum # of people allowed across all teams in the activity. |
| `requiresGuardianOath` | `boolean` | no | If true, you have to Solemnly Swear to be up to Nothing But Good(tm) to play. |

### Destiny.Definitions.DestinyActivityModeDefinition

This definition represents an "Activity Mode" as it exists in the Historical Stats endpoints. An individual Activity Mode represents a collection of activities that are played in a certain way. For example, Nightfall Strikes are part of a "Nightfall" activity mode, and any activities played as the PVP mode "Clash" are part of the "Clash activity mode.
Activity modes are nested under each other in a hierarchy, so that if you ask for - for example - "AllPvP", you will get any PVP activities that the user has played, regardless of what specific PVP mode was being played.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `pgcrImage` | `string` | no | If this activity mode has a related PGCR image, this will be the path to said image. |
| `modeType` | `integer(int32)` | no | The Enumeration value for this Activity Mode. Pass this identifier into Stats endpoints to get aggregate stats for this mode. |
| `activityModeCategory` | `integer(int32)` | no | The type of play being performed in broad terms (PVP, PVE) |
| `isTeamBased` | `boolean` | no | If True, this mode has oppositional teams fighting against each other rather than "Free-For-All" or Co-operative modes of play.<br>Note that Aggregate modes are never marked as team based, even if they happen to be team based at the moment. At any time, an aggregate whose subordinates are only team based could be changed so that one or more aren't team based, and then this boolean won't make much sense (the aggregation would become "sometimes team based"). Let's not deal with that right now. |
| `isAggregateMode` | `boolean` | no | If true, this mode is an aggregation of other, more specific modes rather than being a mode in itself. This includes modes that group Features/Events rather than Gameplay, such as Trials of The Nine: Trials of the Nine being an Event that is interesting to see aggregate data for, but when you play the activities within Trials of the Nine they are more specific activity modes such as Clash. |
| `parentHashes` | `integer(uint32)[]` | no | The hash identifiers of the DestinyActivityModeDefinitions that represent all of the "parent" modes for this mode. For instance, the Nightfall Mode is also a member of AllStrikes and AllPvE. |
| `friendlyName` | `string` | no | A Friendly identifier you can use for referring to this Activity Mode. We really only used this in our URLs, so... you know, take that for whatever it's worth. |
| `activityModeMappings` | `object` | no | If this exists, the mode has specific Activities (referred to by the Key) that should instead map to other Activity Modes when they are played. This was useful in D1 for Private Matches, where we wanted to have Private Matches as an activity mode while still referring to the specific mode being played. |
| `display` | `boolean` | no | If FALSE, we want to ignore this type when we're showing activity modes in BNet UI. It will still be returned in case 3rd parties want to use it for any purpose. |
| `order` | `integer(int32)` | no | The relative ordering of activity modes. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyActivityModifierReferenceDefinition

A reference to an Activity Modifier from another entity, such as an Activity (for now, just Activities).
This defines some

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityModifierHash` | `integer(uint32)` | no | The hash identifier for the DestinyActivityModifierDefinition referenced by this activity. |

### Destiny.Definitions.DestinyActivityPlaylistItemDefinition

If the activity is a playlist, this is the definition for a specific entry in the playlist: a single possible combination of Activity and Activity Mode that can be chosen.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no | The hash identifier of the Activity that can be played. Use it to look up the DestinyActivityDefinition. |
| `directActivityModeHash` | `integer(uint32)` | no | If this playlist entry had an activity mode directly defined on it, this will be the hash of that mode. |
| `directActivityModeType` | `integer(int32)` | no | If the playlist entry had an activity mode directly defined on it, this will be the enum value of that mode. |
| `activityModeHashes` | `integer(uint32)[]` | no | The hash identifiers for Activity Modes relevant to this entry. |
| `activityModeTypes` | `integer(int32)[]` | no | The activity modes - if any - in enum form. Because we can't seem to escape the enums. |

### Destiny.Definitions.DestinyActivityRequirementLabel

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayString` | `string` | no |  |

### Destiny.Definitions.DestinyActivityRequirementsBlock

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `leaderRequirementLabels` | `Destiny.Definitions.DestinyActivityRequirementLabel[]` | no | If being a fireteam Leader in this activity is gated, this is the gate being checked. |
| `fireteamRequirementLabels` | `Destiny.Definitions.DestinyActivityRequirementLabel[]` | no | If being a fireteam member in this activity is gated, this is the gate being checked. |

### Destiny.Definitions.DestinyActivityRewardDefinition

Activities can refer to one or more sets of tooltip-friendly reward data. These are the definitions for those tooltip friendly rewards.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `rewardText` | `string` | no | The header for the reward set, if any. |
| `rewardItems` | `Destiny.DestinyItemQuantity[]` | no | The "Items provided" in the reward. This is almost always a pointer to a DestinyInventoryItemDefintion for an item that you can't actually earn in-game, but that has name/description/icon information for the vague concept of the rewards you will receive. This is because the actual reward generation is non-deterministic and extremely complicated, so the best the game can do is tell you what you'll get in vague terms. And so too shall we.<br>Interesting trivia: you actually *do* earn these items when you complete the activity. They go into a single-slot bucket on your profile, which is how you see the pop-ups of these rewards when you complete an activity that match these "dummy" items. You can even see them if you look at the last one you earned in your profile-level inventory through the BNet API! Who said reading documentation is a waste of time? |

### Destiny.Definitions.DestinyActivityRewardItem

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemQuantity` | `Destiny.DestinyItemQuantity` | no |  |
| `uiStyle` | `string` | no |  |

### Destiny.Definitions.DestinyActivityRewardMapping

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayBehavior` | `integer(int32)` | no |  |
| `rewardItems` | `Destiny.Definitions.DestinyActivityRewardItem[]` | no |  |

### Destiny.Definitions.DestinyActivitySelectableSkullCollections

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `selectableSkullCollectionHash` | `integer(uint32)` | no |  |
| `minimumTierRank` | `integer(int32)` | no |  |
| `maximumTierRank` | `integer(int32)` | no |  |

### Destiny.Definitions.DestinyActivityTypeDefinition

The definition for an Activity Type.
In Destiny 2, an Activity Type represents a conceptual categorization of Activities.
These are most commonly used in the game for the subtitle under Activities, but BNet uses them extensively to identify and group activities by their common properties.
Unfortunately, there has been a movement away from providing the richer data in Destiny 2 that we used to get in Destiny 1 for Activity Types. For instance, Nightfalls are grouped under the same Activity Type as regular Strikes. 
For this reason, BNet will eventually migrate toward Activity Modes as a better indicator of activity category. But for the time being, it is still referred to in many places across our codebase.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyActivityUnlockStringDefinition

Represents a status string that could be conditionally displayed about an activity. Note that externally, you can only see the strings themselves. Internally we combine this information with server state to determine which strings should be shown.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayString` | `string` | no | The string to be displayed if the conditions are met. |

### Destiny.Definitions.DestinyArrangementRegionFilterDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `artArrangementRegionHash` | `integer(uint32)` | no |  |
| `artArrangementRegionIndex` | `integer(int32)` | no |  |
| `statHash` | `integer(uint32)` | no |  |
| `arrangementIndexByStatValue` | `object` | no |  |

### Destiny.Definitions.DestinyArtDyeReference

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `artDyeChannelHash` | `integer(uint32)` | no |  |

### Destiny.Definitions.DestinyBubbleDefinition

Basic identifying data about the bubble. Combine with DestinyDestinationBubbleSettingDefinition - see DestinyDestinationDefinition.bubbleSettings for more information.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `hash` | `integer(uint32)` | no | The identifier for the bubble: only guaranteed to be unique within the Destination. |
| `displayProperties` | `object` | no | The display properties of this bubble, so you don't have to look them up in a separate list anymore. |

### Destiny.Definitions.DestinyClassDefinition

Defines a Character Class in Destiny 2. These are types of characters you can play, like Titan, Warlock, and Hunter.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `classType` | `integer(int32)` | no | In Destiny 1, we added a convenience Enumeration for referring to classes. We've kept it, though mostly for posterity. This is the enum value for this definition's class. |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `genderedClassNames` | `object` | no | A localized string referring to the singular form of the Class's name when referred to in gendered form. Keyed by the DestinyGender. |
| `genderedClassNamesByGenderHash` | `object` | no |  |
| `mentorVendorHash` | `integer(uint32)` | no | Mentors don't really mean anything anymore. Don't expect this to be populated. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyDamageTypeDefinition

All damage types that are possible in the game are defined here, along with localized info and icons as needed.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | The description of the damage type, icon etc... |
| `transparentIconPath` | `string` | no | A variant of the icon that is transparent and colorless. |
| `showIcon` | `boolean` | no | If TRUE, the game shows this damage type's icon. Otherwise, it doesn't. Whether you show it or not is up to you. |
| `enumValue` | `integer(int32)` | no | We have an enumeration for damage types for quick reference. This is the current definition's damage type enum value. |
| `color` | `object` | no | A color associated with the damage type. The displayProperties icon is tinted with a color close to this. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyDefinition

Provides common properties for destiny definitions.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyDestinationBubbleSettingDefinition

Human readable data about the bubble. Combine with DestinyBubbleDefinition - see DestinyDestinationDefinition.bubbleSettings for more information.
DEPRECATED - Just use bubbles.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |

### Destiny.Definitions.DestinyDestinationDefinition

On to one of the more confusing subjects of the API. What is a Destination, and what is the relationship between it, Activities, Locations, and Places?
A "Destination" is a specific region/city/area of a larger "Place". For instance, a Place might be Earth where a Destination might be Bellevue, Washington. (Please, pick a more interesting destination if you come to visit Earth).

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `placeHash` | `integer(uint32)` | no | The place that "owns" this Destination. Use this hash to look up the DestinyPlaceDefinition. |
| `defaultFreeroamActivityHash` | `integer(uint32)` | no | If this Destination has a default Free-Roam activity, this is the hash for that Activity. Use it to look up the DestinyActivityDefintion. |
| `activityGraphEntries` | `Destiny.Definitions.DestinyActivityGraphListEntryDefinition[]` | no | If the Destination has default Activity Graphs (i.e. "Map") that should be shown in the director, this is the list of those Graphs. At most, only one should be active at any given time for a Destination: these would represent, for example, different variants on a Map if the Destination is changing on a macro level based on game state. |
| `bubbleSettings` | `Destiny.Definitions.DestinyDestinationBubbleSettingDefinition[]` | no | A Destination may have many "Bubbles" zones with human readable properties.<br>We don't get as much info as I'd like about them - I'd love to return info like where on the map they are located - but at least this gives you the name of those bubbles. bubbleSettings and bubbles both have the identical number of entries, and you should match up their indexes to provide matching bubble and bubbleSettings data.<br>DEPRECATED - Just use bubbles, it now has this data. |
| `bubbles` | `Destiny.Definitions.DestinyBubbleDefinition[]` | no | This provides the unique identifiers for every bubble in the destination (only guaranteed unique within the destination), and any intrinsic properties of the bubble.<br>bubbleSettings and bubbles both have the identical number of entries, and you should match up their indexes to provide matching bubble and bubbleSettings data. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyDisplayCategoryDefinition

Display Categories are different from "categories" in that these are specifically for visual grouping and display of categories in Vendor UI. The "categories" structure is for validation of the contained items, and can be categorized entirely separately from "Display Categories", there need be and often will be no meaningful relationship between the two.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `index` | `integer(int32)` | no |  |
| `identifier` | `string` | no | A string identifier for the display category. |
| `displayCategoryHash` | `integer(uint32)` | no |  |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `displayInBanner` | `boolean` | no | If true, this category should be displayed in the "Banner" section of the vendor's UI. |
| `progressionHash` | `integer(uint32)` | no | If it exists, this is the hash identifier of a DestinyProgressionDefinition that represents the progression to show on this display category.<br>Specific categories can now have thier own distinct progression, apparently. So that's cool. |
| `sortOrder` | `integer(int32)` | no | If this category sorts items in a nonstandard way, this will be the way we sort. |
| `displayStyleHash` | `integer(uint32)` | no | An indicator of how the category will be displayed in the UI. It's up to you to do something cool or interesting in response to this, or just to treat it as a normal category. |
| `displayStyleIdentifier` | `string` | no | An indicator of how the category will be displayed in the UI. It's up to you to do something cool or interesting in response to this, or just to treat it as a normal category. |

### Destiny.Definitions.DestinyEntitySearchResult

The results of a search for Destiny content. This will be improved on over time, I've been doing some experimenting to see what might be useful.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `suggestedWords` | `string[]` | no | A list of suggested words that might make for better search results, based on the text searched for. |
| `results` | `object` | no | The items found that are matches/near matches for the searched-for term, sorted by something vaguely resembling "relevance". Hopefully this will get better in the future. |

### Destiny.Definitions.DestinyEntitySearchResultItem

An individual Destiny Entity returned from the entity search.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `hash` | `integer(uint32)` | no | The hash identifier of the entity. You will use this to look up the DestinyDefinition relevant for the entity found. |
| `entityType` | `string` | no | The type of entity, returned as a string matching the DestinyDefinition's contract class name. You'll have to have your own mapping from class names to actually looking up those definitions in the manifest databases. |
| `displayProperties` | `object` | no | Basic display properties on the entity, so you don't have to look up the definition to show basic results for the item. |
| `weight` | `number(double)` | no | The ranking value for sorting that we calculated using our relevance formula. This will hopefully get better with time and iteration. |

### Destiny.Definitions.DestinyEquipmentSlotDefinition

Characters can not only have Inventory buckets (containers of items that are generally matched by their type or functionality), they can also have Equipment Slots.
The Equipment Slot is an indicator that the related bucket can have instanced items equipped on the character. For instance, the Primary Weapon bucket has an Equipment Slot that determines whether you can equip primary weapons, and holds the association between its slot and the inventory bucket from which it can have items equipped.
An Equipment Slot must have a related Inventory Bucket, but not all inventory buckets must have Equipment Slots.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `equipmentCategoryHash` | `integer(uint32)` | no | These technically point to "Equipment Category Definitions". But don't get excited. There's nothing of significant value in those definitions, so I didn't bother to expose them. You can use the hash here to group equipment slots by common functionality, which serves the same purpose as if we had the Equipment Category definitions exposed. |
| `bucketTypeHash` | `integer(uint32)` | no | The inventory bucket that owns this equipment slot. |
| `applyCustomArtDyes` | `boolean` | no | If True, equipped items should have their custom art dyes applied when rendering the item. Otherwise, custom art dyes on an item should be ignored if the item is equipped in this slot. |
| `artDyeChannels` | `Destiny.Definitions.DestinyArtDyeReference[]` | no | The Art Dye Channels that apply to this equipment slot. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyEquippingBlockDefinition

Items that can be equipped define this block. It contains information we need to understand how and when the item can be equipped.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `gearsetItemHash` | `integer(uint32)` | no | If the item is part of a gearset, this is a reference to that gearset item. |
| `uniqueLabel` | `string` | no | If defined, this is the label used to check if the item has other items of matching types already equipped. <br>For instance, when you aren't allowed to equip more than one Exotic Weapon, that's because all exotic weapons have identical uniqueLabels and the game checks the to-be-equipped item's uniqueLabel vs. all other already equipped items (other than the item in the slot that's about to be occupied). |
| `uniqueLabelHash` | `integer(uint32)` | no | The hash of that unique label. Does not point to a specific definition. |
| `equipmentSlotTypeHash` | `integer(uint32)` | no | An equipped item *must* be equipped in an Equipment Slot. This is the hash identifier of the DestinyEquipmentSlotDefinition into which it must be equipped. |
| `attributes` | `integer(int32)` | no | These are custom attributes on the equippability of the item.<br>For now, this can only be "equip on acquire", which would mean that the item will be automatically equipped as soon as you pick it up. |
| `ammoType` | `integer(int32)` | no | Ammo type used by a weapon is no longer determined by the bucket in which it is contained. If the item has an ammo type - i.e. if it is a weapon - this will be the type of ammunition expected. |
| `displayStrings` | `string[]` | no | These are strings that represent the possible Game/Account/Character state failure conditions that can occur when trying to equip the item. They match up one-to-one with requiredUnlockExpressions. |
| `equipableItemSetHash` | `integer(uint32)` | no | If this item is part of an item set with bonus perks, this will the hash of that set. |

### Destiny.Definitions.DestinyFactionDefinition

These definitions represent Factions in the game. Factions have ended up unilaterally being related to Vendors that represent them, but that need not necessarily be the case.
A Faction is really just an entity that has a related progression for which a character can gain experience. In Destiny 1, Dead Orbit was an example of a Faction: there happens to be a Vendor that represents Dead Orbit (and indeed, DestinyVendorDefinition.factionHash defines to this relationship), but Dead Orbit could theoretically exist without the Vendor that provides rewards.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `progressionHash` | `integer(uint32)` | no | The hash identifier for the DestinyProgressionDefinition that indicates the character's relationship with this faction in terms of experience and levels. |
| `tokenValues` | `object` | no | The faction token item hashes, and their respective progression values. |
| `rewardItemHash` | `integer(uint32)` | no | The faction reward item hash, usually an engram. |
| `rewardVendorHash` | `integer(uint32)` | no | The faction reward vendor hash, used for faction engram previews. |
| `vendors` | `Destiny.Definitions.DestinyFactionVendorDefinition[]` | no | List of vendors that are associated with this faction. The last vendor that passes the unlock flag checks is the one that should be shown. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyFactionVendorDefinition

These definitions represent faction vendors at different points in the game.
A single faction may contain multiple vendors, or the same vendor available at two different locations.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorHash` | `integer(uint32)` | no | The faction vendor hash. |
| `destinationHash` | `integer(uint32)` | no | The hash identifier for a Destination at which this vendor may be located. Each destination where a Vendor may exist will only ever have a single entry. |
| `backgroundImagePath` | `string` | no | The relative path to the background image representing this Vendor at this location, for use in a banner. |

### Destiny.Definitions.DestinyGearArtArrangementReference

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `classHash` | `integer(uint32)` | no |  |
| `artArrangementHash` | `integer(uint32)` | no |  |

### Destiny.Definitions.DestinyGenderDefinition

Gender is a social construct, and as such we have definitions for Genders. Right now there happens to only be two, but we'll see what the future holds.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `genderType` | `integer(int32)` | no | This is a quick reference enumeration for all of the currently defined Genders. We use the enumeration for quicker lookups in related data, like DestinyClassDefinition.genderedClassNames. |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyInventoryBucketDefinition

An Inventory (be it Character or Profile level) is comprised of many Buckets. An example of a bucket is "Primary Weapons", where all of the primary weapons on a character are gathered together into a single visual element in the UI: a subset of the inventory that has a limited number of slots, and in this case also has an associated Equipment Slot for equipping an item in the bucket.
Item definitions declare what their "default" bucket is (DestinyInventoryItemDefinition.inventory.bucketTypeHash), and Item instances will tell you which bucket they are currently residing in (DestinyItemComponent.bucketHash). You can use this information along with the DestinyInventoryBucketDefinition to show these items grouped by bucket.
You cannot transfer an item to a bucket that is not its Default without going through a Vendor's "accepted items" (DestinyVendorDefinition.acceptedItems). This is how transfer functionality like the Vault is implemented, as a feature of a Vendor. See the vendor's acceptedItems property for more details.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `scope` | `integer(int32)` | no | Where the bucket is found. 0 = Character, 1 = Account |
| `category` | `integer(int32)` | no | An enum value for what items can be found in the bucket. See the BucketCategory enum for more details. |
| `bucketOrder` | `integer(int32)` | no | Use this property to provide a quick-and-dirty recommended ordering for buckets in the UI. Most UIs will likely want to forsake this for something more custom and manual. |
| `itemCount` | `integer(int32)` | no | The maximum # of item "slots" in a bucket. A slot is a given combination of item + quantity.<br>For instance, a Weapon will always take up a single slot, and always have a quantity of 1. But a material could take up only a single slot with hundreds of quantity. |
| `location` | `integer(int32)` | no | Sometimes, inventory buckets represent conceptual "locations" in the game that might not be expected. This value indicates the conceptual location of the bucket, regardless of where it is actually contained on the character/account. <br>See ItemLocation for details. <br>Note that location includes the Vault and the Postmaster (both of whom being just inventory buckets with additional actions that can be performed on them through a Vendor) |
| `hasTransferDestination` | `boolean` | no | If TRUE, there is at least one Vendor that can transfer items to/from this bucket. See the DestinyVendorDefinition's acceptedItems property for more information on how transferring works. |
| `enabled` | `boolean` | no | If True, this bucket is enabled. Disabled buckets may include buckets that were included for test purposes, or that were going to be used but then were abandoned but never removed from content *cough*. |
| `fifo` | `boolean` | no | if a FIFO bucket fills up, it will delete the oldest item from said bucket when a new item tries to be added to it. If this is FALSE, the bucket will not allow new items to be placed in it until room is made by the user manually deleting items from it. You can see an example of this with the Postmaster's bucket. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyInventoryItemDefinition

So much of what you see in Destiny is actually an Item used in a new and creative way. This is the definition for Items in Destiny, which started off as just entities that could exist in your Inventory but ended up being the backing data for so much more: quests, reward previews, slots, and subclasses.
In practice, you will want to associate this data with "live" item data from a Bungie.Net Platform call: these definitions describe the item in generic, non-instanced terms: but an actual instance of an item can vary widely from these generic definitions.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `tooltipNotifications` | `Destiny.Definitions.DestinyItemTooltipNotification[]` | no | Tooltips that only come up conditionally for the item. Check the live data DestinyItemComponent.tooltipNotificationIndexes property for which of these should be shown at runtime. |
| `collectibleHash` | `integer(uint32)` | no | If this item has a collectible related to it, this is the hash identifier of that collectible entry. |
| `iconWatermark` | `string` | no | If available, this is the original 'active' release watermark overlay for the icon. If the item has different versions, this can be overridden by the 'display version watermark icon' from the 'quality' block. Alternatively, if there is no watermark for the version, and the item version has a power cap below the current season power cap, this can be overridden by the iconWatermarkShelved property. |
| `iconWatermarkShelved` | `string` | no | If available, this is the 'shelved' release watermark overlay for the icon. If the item version has a power cap below the current season power cap, it can be treated as 'shelved', and should be shown with this 'shelved' watermark overlay. |
| `iconWatermarkFeatured` | `string` | no | This is the active watermark for the item if it is currently Featured in-game. Clients should use the isFeaturedItem boolean to decide whether or not to show this as opposed to iconWatermark. |
| `secondaryIcon` | `string` | no | A secondary icon associated with the item. Currently this is used in very context specific applications, such as Emblem Nameplates. |
| `secondaryOverlay` | `string` | no | Pulled from the secondary icon, this is the "secondary background" of the secondary icon. Confusing? Sure, that's why I call it "overlay" here: because as far as it's been used thus far, it has been for an optional overlay image. We'll see if that holds up, but at least for now it explains what this image is a bit better. |
| `secondarySpecial` | `string` | no | Pulled from the Secondary Icon, this is the "special" background for the item. For Emblems, this is the background image used on the Details view: but it need not be limited to that for other types of items. |
| `backgroundColor` | `object` | no | Sometimes, an item will have a background color. Most notably this occurs with Emblems, who use the Background Color for small character nameplates such as the "friends" view you see in-game. There are almost certainly other items that have background color as well, though I have not bothered to investigate what items have it nor what purposes they serve: use it as you will. |
| `isFeaturedItem` | `boolean` | no | Whether or not this item is currently featured in the game, giving it a special watermark |
| `isHolofoil` | `boolean` | no | Whether or not this item is holofoil, which has special icon treatment and in-game appearance. |
| `isAdept` | `boolean` | no | Whether or not this item is adept, which has increased stats and/or perks. |
| `screenshot` | `string` | no | If we were able to acquire an in-game screenshot for the item, the path to that screenshot will be returned here. Note that not all items have screenshots: particularly not any non-equippable items. |
| `itemTypeDisplayName` | `string` | no | The localized title/name of the item's type. This can be whatever the designers want, and has no guarantee of consistency between items. |
| `flavorText` | `string` | no |  |
| `uiItemDisplayStyle` | `string` | no | A string identifier that the game's UI uses to determine how the item should be rendered in inventory screens and the like. This could really be anything - at the moment, we don't have the time to really breakdown and maintain all the possible strings this could be, partly because new ones could be added ad hoc. But if you want to use it to dictate your own UI, or look for items with a certain display style, go for it! |
| `itemTypeAndTierDisplayName` | `string` | no | It became a common enough pattern in our UI to show Item Type and Tier combined into a single localized string that I'm just going to go ahead and start pre-creating these for items. |
| `displaySource` | `string` | no | In theory, it is a localized string telling you about how you can find the item. I really wish this was more consistent. Many times, it has nothing. Sometimes, it's instead a more narrative-forward description of the item. Which is cool, and I wish all properties had that data, but it should really be its own property. |
| `tooltipStyle` | `string` | no | An identifier that the game UI uses to determine what type of tooltip to show for the item. These have no corresponding definitions that BNet can link to: so it'll be up to you to interpret and display your UI differently according to these styles (or ignore it). |
| `action` | `object` | no | If the item can be "used", this block will be non-null, and will have data related to the action performed when using the item. (Guess what? 99% of the time, this action is "dismantle". Shocker) |
| `crafting` | `object` | no | Recipe items will have relevant crafting information available here. |
| `inventory` | `object` | no | If this item can exist in an inventory, this block will be non-null. In practice, every item that currently exists has one of these blocks. But note that it is not necessarily guaranteed. |
| `setData` | `object` | no | If this item is a quest, this block will be non-null. In practice, I wish I had called this the Quest block, but at the time it wasn't clear to me whether it would end up being used for purposes other than quests. It will contain data about the steps in the quest, and mechanics we can use for displaying and tracking the quest. |
| `stats` | `object` | no | If this item can have stats (such as a weapon, armor, or vehicle), this block will be non-null and populated with the stats found on the item. |
| `emblemObjectiveHash` | `integer(uint32)` | no | If the item is an emblem that has a special Objective attached to it - for instance, if the emblem tracks PVP Kills, or what-have-you. This is a bit different from, for example, the Vanguard Kill Tracker mod, which pipes data into the "art channel". When I get some time, I would like to standardize these so you can get at the values they expose without having to care about what they're being used for and how they are wired up, but for now here's the raw data. |
| `equippingBlock` | `object` | no | If this item can be equipped, this block will be non-null and will be populated with the conditions under which it can be equipped. |
| `translationBlock` | `object` | no | If this item can be rendered, this block will be non-null and will be populated with rendering information. |
| `preview` | `object` | no | If this item can be Used or Acquired to gain other items (for instance, how Eververse Boxes can be consumed to get items from the box), this block will be non-null and will give summary information for the items that can be acquired. |
| `quality` | `object` | no | If this item can have a level or stats, this block will be non-null and will be populated with default quality (item level, "quality", and infusion) data. See the block for more details, there's often less upfront information in D2 so you'll want to be aware of how you use quality and item level on the definition level now. |
| `value` | `object` | no | The conceptual "Value" of an item, if any was defined. See the DestinyItemValueBlockDefinition for more details. |
| `sourceData` | `object` | no | If this item has a known source, this block will be non-null and populated with source information. Unfortunately, at this time we are not generating sources: that is some aggressively manual work which we didn't have time for, and I'm hoping to get back to at some point in the future. |
| `objectives` | `object` | no | If this item has Objectives (extra tasks that can be accomplished related to the item... most frequently when the item is a Quest Step and the Objectives need to be completed to move on to the next Quest Step), this block will be non-null and the objectives defined herein. |
| `metrics` | `object` | no | If this item has available metrics to be shown, this block will be non-null have the appropriate hashes defined. |
| `plug` | `object` | no | If this item *is* a Plug, this will be non-null and the info defined herein. See DestinyItemPlugDefinition for more information. |
| `gearset` | `object` | no | If this item has related items in a "Gear Set", this will be non-null and the relationships defined herein. |
| `sack` | `object` | no | If this item is a "reward sack" that can be opened to provide other items, this will be non-null and the properties of the sack contained herein. |
| `sockets` | `object` | no | If this item has any Sockets, this will be non-null and the individual sockets on the item will be defined herein. |
| `summary` | `object` | no | Summary data about the item. |
| `talentGrid` | `object` | no | If the item has a Talent Grid, this will be non-null and the properties of the grid defined herein. Note that, while many items still have talent grids, the only ones with meaningful Nodes still on them will be Subclass/"Build" items. |
| `investmentStats` | `Destiny.Definitions.DestinyItemInvestmentStatDefinition[]` | no | If the item has stats, this block will be defined. It has the "raw" investment stats for the item. These investment stats don't take into account the ways that the items can spawn, nor do they take into account any Stat Group transformations. I have retained them for debugging purposes, but I do not know how useful people will find them. |
| `perks` | `Destiny.Definitions.DestinyItemPerkEntryDefinition[]` | no | If the item has any *intrinsic* Perks (Perks that it will provide regardless of Sockets, Talent Grid, and other transitory state), they will be defined here. |
| `loreHash` | `integer(uint32)` | no | If the item has any related Lore (DestinyLoreDefinition), this will be the hash identifier you can use to look up the lore definition. |
| `summaryItemHash` | `integer(uint32)` | no | There are times when the game will show you a "summary/vague" version of an item - such as a description of its type represented as a DestinyInventoryItemDefinition - rather than display the item itself.<br>This happens sometimes when summarizing possible rewards in a tooltip. This is the item displayed instead, if it exists. |
| `animations` | `Destiny.Definitions.Animations.DestinyAnimationReference[]` | no | If any animations were extracted from game content for this item, these will be the definitions of those animations. |
| `allowActions` | `boolean` | no | BNet may forbid the execution of actions on this item via the API. If that is occurring, allowActions will be set to false. |
| `links` | `Links.HyperlinkReference[]` | no | If we added any help or informational URLs about this item, these will be those links. |
| `doesPostmasterPullHaveSideEffects` | `boolean` | no | The boolean will indicate to us (and you!) whether something *could* happen when you transfer this item from the Postmaster that might be considered a "destructive" action.<br>It is not feasible currently to tell you (or ourelves!) in a consistent way whether this *will* actually cause a destructive action, so we are playing it safe: if it has the potential to do so, we will not allow it to be transferred from the Postmaster by default. You will need to check for this flag before transferring an item from the Postmaster, or else you'll end up receiving an error. |
| `nonTransferrable` | `boolean` | no | The intrinsic transferability of an item.<br>I hate that this boolean is negative - but there's a reason.<br>Just because an item is intrinsically transferrable doesn't mean that it can be transferred, and we don't want to imply that this is the only source of that transferability. |
| `itemCategoryHashes` | `integer(uint32)[]` | no | BNet attempts to make a more formal definition of item "Categories", as defined by DestinyItemCategoryDefinition. This is a list of all Categories that we were able to algorithmically determine that this item is a member of. (for instance, that it's a "Weapon", that it's an "Auto Rifle", etc...)<br>The algorithm for these is, unfortunately, volatile. If you believe you see a miscategorized item, please let us know on the Bungie API forums. |
| `specialItemType` | `integer(int32)` | no | In Destiny 1, we identified some items as having particular categories that we'd like to know about for various internal logic purposes. These are defined in SpecialItemType, and while these days the itemCategoryHashes are the preferred way of identifying types, we have retained this enum for its convenience. |
| `itemType` | `integer(int32)` | no | A value indicating the "base" the of the item. This enum is a useful but dramatic oversimplification of what it means for an item to have a "Type". Still, it's handy in many situations.<br>itemCategoryHashes are the preferred way of identifying types, we have retained this enum for its convenience. |
| `itemSubType` | `integer(int32)` | no | A value indicating the "sub-type" of the item. For instance, where an item might have an itemType value "Weapon", this will be something more specific like "Auto Rifle".<br>itemCategoryHashes are the preferred way of identifying types, we have retained this enum for its convenience. |
| `classType` | `integer(int32)` | no | We run a similarly weak-sauce algorithm to try and determine whether an item is restricted to a specific class. If we find it to be restricted in such a way, we set this classType property to match the class' enumeration value so that users can easily identify class restricted items.<br>If you see a mis-classed item, please inform the developers in the Bungie API forum. |
| `breakerType` | `integer(int32)` | no | Some weapons and plugs can have a "Breaker Type": a special ability that works sort of like damage type vulnerabilities. This is (almost?) always set on items by plugs. |
| `breakerTypeHash` | `integer(uint32)` | no | Since we also have a breaker type definition, this is the hash for that breaker type for your convenience. Whether you use the enum or hash and look up the definition depends on what's cleanest for your code. |
| `equippable` | `boolean` | no | If true, then you will be allowed to equip the item if you pass its other requirements.<br>This being false means that you cannot equip the item under any circumstances. |
| `damageTypeHashes` | `integer(uint32)[]` | no | Theoretically, an item can have many possible damage types. In *practice*, this is not true, but just in case weapons start being made that have multiple (for instance, an item where a socket has reusable plugs for every possible damage type that you can choose from freely), this field will return all of the possible damage types that are available to the weapon by default. |
| `damageTypes` | `integer(int32)[]` | no | This is the list of all damage types that we know ahead of time the item can take on. Unfortunately, this does not preclude the possibility of something funky happening to give the item a damage type that cannot be predicted beforehand: for example, if some designer decides to create arbitrary non-reusable plugs that cause damage type to change.<br>This damage type prediction will only use the following to determine potential damage types:<br>- Intrinsic perks<br>- Talent Node perks<br>- Known, reusable plugs for sockets |
| `defaultDamageType` | `integer(int32)` | no | If the item has a damage type that could be considered to be default, it will be populated here.<br>For various upsetting reasons, it's surprisingly cumbersome to figure this out. I hope you're happy. |
| `defaultDamageTypeHash` | `integer(uint32)` | no | Similar to defaultDamageType, but represented as the hash identifier for a DestinyDamageTypeDefinition.<br>I will likely regret leaving in the enumeration versions of these properties, but for now they're very convenient. |
| `seasonHash` | `integer(uint32)` | no | If this item is related directly to a Season of Destiny, this is the hash identifier for that season. |
| `isWrapper` | `boolean` | no | If true, this is a dummy vendor-wrapped item template. Items purchased from Eververse will be "wrapped" by one of these items so that we can safely provide refund capabilities before the item is "unwrapped". |
| `traitIds` | `string[]` | no | Traits are metadata tags applied to this item. For example: armor slot, weapon type, foundry, faction, etc. These IDs come from the game and don't map to any content, but should still be useful. |
| `traitHashes` | `integer(uint32)[]` | no | These are the corresponding trait definition hashes for the entries in traitIds. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyInventoryItemStatDefinition

Defines a specific stat value on an item, and the minimum/maximum range that we could compute for the item based on our heuristics for how the item might be generated.
Not guaranteed to match real-world instances of the item, but should hopefully at least be close. If it's not close, let us know on the Bungie API forums.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `statHash` | `integer(uint32)` | no | The hash for the DestinyStatDefinition representing this stat. |
| `value` | `integer(int32)` | no | This value represents the stat value assuming the minimum possible roll but accounting for any mandatory bonuses that should be applied to the stat on item creation.<br>In Destiny 1, this was different from the "minimum" value because there were certain conditions where an item could be theoretically lower level/value than the initial roll. <br>In Destiny 2, this is not possible unless Talent Grids begin to be used again for these purposes or some other system change occurs... thus in practice, value and minimum should be the same in Destiny 2. Good riddance. |
| `minimum` | `integer(int32)` | no | The minimum possible value for this stat that we think the item can roll. |
| `maximum` | `integer(int32)` | no | The maximum possible value for this stat that we think the item can roll.<br>WARNING: In Destiny 1, this field was calculated using the potential stat rolls on the item's talent grid. In Destiny 2, items no longer have meaningful talent grids and instead have sockets: but the calculation of this field was never altered to adapt to this change. As such, this field should be considered deprecated until we can address this oversight. |
| `displayMaximum` | `integer(int32)` | no | The maximum possible value for the stat as shown in the UI, if it is being shown somewhere that reveals maximum in the UI (such as a bar chart-style view).<br>This is pulled directly from the item's DestinyStatGroupDefinition, and placed here for convenience.<br>If not returned, there is no maximum to use (and thus the stat should not be shown in a way that assumes there is a limit to the stat) |

### Destiny.Definitions.DestinyItemActionBlockDefinition

If an item can have an action performed on it (like "Dismantle"), it will be defined here if you care.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `verbName` | `string` | no | Localized text for the verb of the action being performed. |
| `verbDescription` | `string` | no | Localized text describing the action being performed. |
| `isPositive` | `boolean` | no | The content has this property, however it's not entirely clear how it is used. |
| `overlayScreenName` | `string` | no | If the action has an overlay screen associated with it, this is the name of that screen. Unfortunately, we cannot return the screen's data itself. |
| `overlayIcon` | `string` | no | The icon associated with the overlay screen for the action, if any. |
| `requiredCooldownSeconds` | `integer(int32)` | no | The number of seconds to delay before allowing this action to be performed again. |
| `requiredItems` | `Destiny.Definitions.DestinyItemActionRequiredItemDefinition[]` | no | If the action requires other items to exist or be destroyed, this is the list of those items and requirements. |
| `progressionRewards` | `Destiny.Definitions.DestinyProgressionRewardDefinition[]` | no | If performing this action earns you Progression, this is the list of progressions and values granted for those progressions by performing this action. |
| `actionTypeLabel` | `string` | no | The internal identifier for the action. |
| `requiredLocation` | `string` | no | Theoretically, an item could have a localized string for a hint about the location in which the action should be performed. In practice, no items yet have this property. |
| `requiredCooldownHash` | `integer(uint32)` | no | The identifier hash for the Cooldown associated with this action. We have not pulled this data yet for you to have more data to use for cooldowns. |
| `deleteOnAction` | `boolean` | no | If true, the item is deleted when the action completes. |
| `consumeEntireStack` | `boolean` | no | If true, the entire stack is deleted when the action completes. |
| `useOnAcquire` | `boolean` | no | If true, this action will be performed as soon as you earn this item. Some rewards work this way, providing you a single item to pick up from a reward-granting vendor in-game and then immediately consuming itself to provide you multiple items. |

### Destiny.Definitions.DestinyItemActionRequiredItemDefinition

The definition of an item and quantity required in a character's inventory in order to perform an action.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `integer(int32)` | no | The minimum quantity of the item you have to have. |
| `itemHash` | `integer(uint32)` | no | The hash identifier of the item you need to have. Use it to look up the DestinyInventoryItemDefinition for more info. |
| `deleteOnAction` | `boolean` | no | If true, the item/quantity will be deleted from your inventory when the action is performed. Otherwise, you'll retain these required items after the action is complete. |

### Destiny.Definitions.DestinyItemCategoryDefinition

In an attempt to categorize items by type, usage, and other interesting properties, we created DestinyItemCategoryDefinition: information about types that is assembled using a set of heuristics that examine the properties of an item such as what inventory bucket it's in, its item type name, and whether it has or is missing certain blocks of data.
This heuristic is imperfect, however. If you find an item miscategorized, let us know on the Bungie API forums!
We then populate all of the categories that we think an item belongs to in its DestinyInventoryItemDefinition.itemCategoryHashes property. You can use that to provide your own custom item filtering, sorting, aggregating... go nuts on it! And let us know if you see more categories that you wish would be added!

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `visible` | `boolean` | no | If True, this category should be visible in UI. Sometimes we make categories that we don't think are interesting externally. It's up to you if you want to skip on showing them. |
| `deprecated` | `boolean` | no | If True, this category has been deprecated: it may have no items left, or there may be only legacy items that remain in it which are no longer relevant to the game. |
| `shortTitle` | `string` | no | A shortened version of the title. The reason why we have this is because the Armory in German had titles that were too long to display in our UI, so these were localized abbreviated versions of those categories. The property still exists today, even though the Armory doesn't exist for D2... yet. |
| `itemTypeRegex` | `string` | no | The janky regular expression we used against the item type to try and discern whether the item belongs to this category. |
| `grantDestinyBreakerType` | `integer(int32)` | no | If the item in question has this category, it also should have this breaker type. |
| `plugCategoryIdentifier` | `string` | no | If the item is a plug, this is the identifier we expect to find associated with it if it is in this category. |
| `itemTypeRegexNot` | `string` | no | If the item type matches this janky regex, it does *not* belong to this category. |
| `originBucketIdentifier` | `string` | no | If the item belongs to this bucket, it does belong to this category. |
| `grantDestinyItemType` | `integer(int32)` | no | If an item belongs to this category, it will also receive this item type. This is now how DestinyItemType is populated for items: it used to be an even jankier process, but that's a story that requires more alcohol. |
| `grantDestinySubType` | `integer(int32)` | no | If an item belongs to this category, it will also receive this subtype enum value.<br>I know what you're thinking - what if it belongs to multiple categories that provide sub-types?<br>The last one processed wins, as is the case with all of these "grant" enums. Now you can see one reason why we moved away from these enums... but they're so convenient when they work, aren't they? |
| `grantDestinyClass` | `integer(int32)` | no | If an item belongs to this category, it will also get this class restriction enum value.<br>See the other "grant"-prefixed properties on this definition for my color commentary. |
| `traitId` | `string` | no | The traitId that can be found on items that belong to this category. |
| `groupedCategoryHashes` | `integer(uint32)[]` | no | If this category is a "parent" category of other categories, those children will have their hashes listed in rendering order here, and can be looked up using these hashes against DestinyItemCategoryDefinition.<br>In this way, you can build up a visual hierarchy of item categories. That's what we did, and you can do it too. I believe in you. Yes, you, Carl.<br>(I hope someone named Carl reads this someday) |
| `parentCategoryHashes` | `integer(uint32)[]` | no | All item category hashes of "parent" categories: categories that contain this as a child through the hierarchy of groupedCategoryHashes. It's a bit redundant, but having this child-centric list speeds up some calculations. |
| `groupCategoryOnly` | `boolean` | no | If true, this category is only used for grouping, and should not be evaluated with its own checks. Rather, the item only has this category if it has one of its child categories. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyItemCraftingBlockBonusPlugDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `socketTypeHash` | `integer(uint32)` | no |  |
| `plugItemHash` | `integer(uint32)` | no |  |

### Destiny.Definitions.DestinyItemCraftingBlockDefinition

If an item can have an action performed on it (like "Dismantle"), it will be defined here if you care.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `outputItemHash` | `integer(uint32)` | no | A reference to the item definition that is created when crafting with this 'recipe' item. |
| `requiredSocketTypeHashes` | `integer(uint32)[]` | no | A list of socket type hashes that describes which sockets are required for crafting with this recipe. |
| `failedRequirementStrings` | `string[]` | no |  |
| `baseMaterialRequirements` | `integer(uint32)` | no | A reference to the base material requirements for crafting with this recipe. |
| `bonusPlugs` | `Destiny.Definitions.DestinyItemCraftingBlockBonusPlugDefinition[]` | no | A list of 'bonus' socket plugs that may be available if certain requirements are met. |

### Destiny.Definitions.DestinyItemCreationEntryLevelDefinition

An overly complicated wrapper for the item level at which the item should spawn.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `level` | `integer(int32)` | no |  |

### Destiny.Definitions.DestinyItemGearsetBlockDefinition

If an item has a related gearset, this is the list of items in that set, and an unlock expression that evaluates to a number representing the progress toward gearset completion (a very rare use for unlock expressions!)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `trackingValueMax` | `integer(int32)` | no | The maximum possible number of items that can be collected. |
| `itemList` | `integer(uint32)[]` | no | The list of hashes for items in the gearset. Use them to look up DestinyInventoryItemDefinition entries for the items in the set. |

### Destiny.Definitions.DestinyItemIntrinsicSocketEntryDefinition

Represents a socket that has a plug associated with it intrinsically. This is useful for situations where the weapon needs to have a visual plug/Mod on it, but that plug/Mod should never change.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `plugItemHash` | `integer(uint32)` | no | Indicates the plug that is intrinsically inserted into this socket. |
| `socketTypeHash` | `integer(uint32)` | no | Indicates the type of this intrinsic socket. |
| `defaultVisible` | `boolean` | no | If true, then this socket is visible in the item's "default" state. If you have an instance, you should always check the runtime state, as that can override this visibility setting: but if you're looking at the item on a conceptual level, this property can be useful for hiding data such as legacy sockets - which remain defined on items for infrastructure purposes, but can be confusing for users to see. |

### Destiny.Definitions.DestinyItemInventoryBlockDefinition

If the item can exist in an inventory - the overwhelming majority of them can and do - then this is the basic properties regarding the item's relationship with the inventory.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `stackUniqueLabel` | `string` | no | If this string is populated, you can't have more than one stack with this label in a given inventory. Note that this is different from the equipping block's unique label, which is used for equipping uniqueness. |
| `maxStackSize` | `integer(int32)` | no | The maximum quantity of this item that can exist in a stack. |
| `bucketTypeHash` | `integer(uint32)` | no | The hash identifier for the DestinyInventoryBucketDefinition to which this item belongs. I should have named this "bucketHash", but too many things refer to it now. Sigh. |
| `recoveryBucketTypeHash` | `integer(uint32)` | no | If the item is picked up by the lost loot queue, this is the hash identifier for the DestinyInventoryBucketDefinition into which it will be placed. Again, I should have named this recoveryBucketHash instead. |
| `tierTypeHash` | `integer(uint32)` | no | The hash identifier for the Tier Type of the item, use to look up its DestinyItemTierTypeDefinition if you need to show localized data for the item's tier. |
| `isInstanceItem` | `boolean` | no | If TRUE, this item is instanced. Otherwise, it is a generic item that merely has a quantity in a stack (like Glimmer). |
| `tierTypeName` | `string` | no | The localized name of the tier type, which is a useful shortcut so you don't have to look up the definition every time. However, it's mostly a holdover from days before we had a DestinyItemTierTypeDefinition to refer to. |
| `tierType` | `integer(int32)` | no | The enumeration matching the tier type of the item to known values, again for convenience sake. |
| `expirationTooltip` | `string` | no | The tooltip message to show, if any, when the item expires. |
| `expiredInActivityMessage` | `string` | no | If the item expires while playing in an activity, we show a different message. |
| `expiredInOrbitMessage` | `string` | no | If the item expires in orbit, we show a... more different message. ("Consummate V's, consummate!") |
| `suppressExpirationWhenObjectivesComplete` | `boolean` | no |  |
| `recipeItemHash` | `integer(uint32)` | no | A reference to the associated crafting 'recipe' item definition, if this item can be crafted. |

### Destiny.Definitions.DestinyItemInvestmentStatDefinition

Represents a "raw" investment stat, before calculated stats are calculated and before any DestinyStatGroupDefinition is applied to transform the stat into something closer to what you see in-game.
Because these won't match what you see in-game, consider carefully whether you really want to use these stats. I have left them in case someone can do something useful or interesting with the pre-processed statistics.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `statTypeHash` | `integer(uint32)` | no | The hash identifier for the DestinyStatDefinition defining this stat. |
| `value` | `integer(int32)` | no | The raw "Investment" value for the stat, before transformations are performed to turn this raw stat into stats that are displayed in the game UI. |
| `isConditionallyActive` | `boolean` | no | If this is true, the stat will only be applied on the item in certain game state conditions, and we can't know statically whether or not this stat will be applied. Check the "live" API data instead for whether this value is being applied on a specific instance of the item in question, and you can use this to decide whether you want to show the stat on the generic view of the item, or whether you want to show some kind of caveat or warning about the stat value being conditional on game state. |

### Destiny.Definitions.DestinyItemMetricBlockDefinition

The metrics available for display and selection on an item.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `availableMetricCategoryNodeHashes` | `integer(uint32)[]` | no | Hash identifiers for any DestinyPresentationNodeDefinition entry that can be used to list available metrics. Any metric listed directly below these nodes, or in any of these nodes' children will be made available for selection. |

### Destiny.Definitions.DestinyItemObjectiveBlockDefinition

An item can have objectives on it. In practice, these are the exclusive purview of "Quest Step" items: DestinyInventoryItemDefinitions that represent a specific step in a Quest.
Quest steps have 1:M objectives that we end up processing and returning in live data as DestinyQuestStatus data, and other useful information.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `objectiveHashes` | `integer(uint32)[]` | no | The hashes to Objectives (DestinyObjectiveDefinition) that are part of this Quest Step, in the order that they should be rendered. |
| `displayActivityHashes` | `integer(uint32)[]` | no | For every entry in objectiveHashes, there is a corresponding entry in this array at the same index. If the objective is meant to be associated with a specific DestinyActivityDefinition, there will be a valid hash at that index. Otherwise, it will be invalid (0).<br>Rendered somewhat obsolete by perObjectiveDisplayProperties, which currently has much the same information but may end up with more info in the future. |
| `requireFullObjectiveCompletion` | `boolean` | no | If True, all objectives must be completed for the step to be completed. If False, any one objective can be completed for the step to be completed. |
| `questlineItemHash` | `integer(uint32)` | no | The hash for the DestinyInventoryItemDefinition representing the Quest to which this Quest Step belongs. |
| `narrative` | `string` | no | The localized string for narrative text related to this quest step, if any. |
| `objectiveVerbName` | `string` | no | The localized string describing an action to be performed associated with the objectives, if any. |
| `questTypeIdentifier` | `string` | no | The identifier for the type of quest being performed, if any. Not associated with any fixed definition, yet. |
| `questTypeHash` | `integer(uint32)` | no | A hashed value for the questTypeIdentifier, because apparently I like to be redundant. |
| `perObjectiveDisplayProperties` | `Destiny.Definitions.DestinyObjectiveDisplayProperties[]` | no | One entry per Objective on the item, it will have related display information. |
| `displayAsStatTracker` | `boolean` | no |  |

### Destiny.Definitions.DestinyItemPerkEntryDefinition

An intrinsic perk on an item, and the requirements for it to be activated.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `requirementDisplayString` | `string` | no | If this perk is not active, this is the string to show for why it's not providing its benefits. |
| `perkHash` | `integer(uint32)` | no | A hash identifier for the DestinySandboxPerkDefinition being provided on the item. |
| `perkVisibility` | `integer(int32)` | no | Indicates whether this perk should be shown, or if it should be shown disabled. |

### Destiny.Definitions.DestinyItemPreviewBlockDefinition

Items like Sacks or Boxes can have items that it shows in-game when you view details that represent the items you can obtain if you use or acquire the item.
This defines those categories, and gives some insights into that data's source.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `screenStyle` | `string` | no | A string that the game UI uses as a hint for which detail screen to show for the item. You, too, can leverage this for your own custom screen detail views. Note, however, that these are arbitrarily defined by designers: there's no guarantees of a fixed, known number of these - so fall back to something reasonable if you don't recognize it. |
| `previewVendorHash` | `integer(uint32)` | no | If the preview data is derived from a fake "Preview" Vendor, this will be the hash identifier for the DestinyVendorDefinition of that fake vendor. |
| `artifactHash` | `integer(uint32)` | no | If this item should show you Artifact information when you preview it, this is the hash identifier of the DestinyArtifactDefinition for the artifact whose data should be shown. |
| `previewActionString` | `string` | no | If the preview has an associated action (like "Open"), this will be the localized string for that action. |
| `derivedItemCategories` | `Destiny.Definitions.Items.DestinyDerivedItemCategoryDefinition[]` | no | This is a list of the items being previewed, categorized in the same way as they are in the preview UI. |

### Destiny.Definitions.DestinyItemQualityBlockDefinition

An item's "Quality" determines its calculated stats. The Level at which the item spawns is combined with its "qualityLevel" along with some additional calculations to determine the value of those stats.
In Destiny 2, most items don't have default item levels and quality, making this property less useful: these apparently are almost always determined by the complex mechanisms of the Reward system rather than statically. They are still provided here in case they are still useful for people. This also contains some information about Infusion.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemLevels` | `integer(int32)[]` | no | The "base" defined level of an item. This is a list because, in theory, each Expansion could define its own base level for an item.<br>In practice, not only was that never done in Destiny 1, but now this isn't even populated at all. When it's not populated, the level at which it spawns has to be inferred by Reward information, of which BNet receives an imperfect view and will only be reliable on instanced data as a result. |
| `qualityLevel` | `integer(int32)` | no | qualityLevel is used in combination with the item's level to calculate stats like Attack and Defense. It plays a role in that calculation, but not nearly as large as itemLevel does. |
| `infusionCategoryName` | `string` | no | The string identifier for this item's "infusability", if any. <br>Items that match the same infusionCategoryName are allowed to infuse with each other.<br>DEPRECATED: Items can now have multiple infusion categories. Please use infusionCategoryHashes instead. |
| `infusionCategoryHash` | `integer(uint32)` | no | The hash identifier for the infusion. It does not map to a Definition entity.<br>DEPRECATED: Items can now have multiple infusion categories. Please use infusionCategoryHashes instead. |
| `infusionCategoryHashes` | `integer(uint32)[]` | no | If any one of these hashes matches any value in another item's infusionCategoryHashes, the two can infuse with each other. |
| `progressionLevelRequirementHash` | `integer(uint32)` | no | An item can refer to pre-set level requirements. They are defined in DestinyProgressionLevelRequirementDefinition, and you can use this hash to find the appropriate definition. |
| `currentVersion` | `integer(uint32)` | no | The latest version available for this item. |
| `versions` | `Destiny.Definitions.DestinyItemVersionDefinition[]` | no | The list of versions available for this item. |
| `displayVersionWatermarkIcons` | `string[]` | no | Icon overlays to denote the item version and power cap status. |

### Destiny.Definitions.DestinyItemSackBlockDefinition

Some items are "sacks" - they can be "opened" to produce other items. This is information related to its sack status, mostly UI strings. Engrams are an example of items that are considered to be "Sacks".

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `detailAction` | `string` | no | A description of what will happen when you open the sack. As far as I can tell, this is blank currently. Unknown whether it will eventually be populated with useful info. |
| `openAction` | `string` | no | The localized name of the action being performed when you open the sack. |
| `selectItemCount` | `integer(int32)` | no |  |
| `vendorSackType` | `string` | no |  |
| `openOnAcquire` | `boolean` | no |  |

### Destiny.Definitions.DestinyItemSetBlockDefinition

Primarily for Quests, this is the definition of properties related to the item if it is a quest and its various quest steps.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemList` | `Destiny.Definitions.DestinyItemSetBlockEntryDefinition[]` | no | A collection of hashes of set items, for items such as Quest Metadata items that possess this data. |
| `requireOrderedSetItemAdd` | `boolean` | no | If true, items in the set can only be added in increasing order, and adding an item will remove any previous item. For Quests, this is by necessity true. Only one quest step is present at a time, and previous steps are removed as you advance in the quest. |
| `setIsFeatured` | `boolean` | no | If true, the UI should treat this quest as "featured" |
| `setType` | `string` | no | A string identifier we can use to attempt to identify the category of the Quest. |
| `questLineName` | `string` | no | The name of the quest line that this quest step is a part of. |
| `questLineDescription` | `string` | no | The description of the quest line that this quest step is a part of. |
| `questStepSummary` | `string` | no | An additional summary of this step in the quest line. |

### Destiny.Definitions.DestinyItemSetBlockEntryDefinition

Defines a particular entry in an ItemSet (AKA a particular Quest Step in a Quest)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `trackingValue` | `integer(int32)` | no | Used for tracking which step a user reached. These values will be populated in the user's internal state, which we expose externally as a more usable DestinyQuestStatus object. If this item has been obtained, this value will be set in trackingUnlockValueHash. |
| `itemHash` | `integer(uint32)` | no | This is the hash identifier for a DestinyInventoryItemDefinition representing this quest step. |

### Destiny.Definitions.DestinyItemSocketBlockDefinition

If defined, the item has at least one socket.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `string` | no | This was supposed to be a string that would give per-item details about sockets. In practice, it turns out that all this ever has is the localized word "details". ... that's lame, but perhaps it will become something cool in the future. |
| `socketEntries` | `Destiny.Definitions.DestinyItemSocketEntryDefinition[]` | no | Each non-intrinsic (or mutable) socket on an item is defined here. Check inside for more info. |
| `intrinsicSockets` | `Destiny.Definitions.DestinyItemIntrinsicSocketEntryDefinition[]` | no | Each intrinsic (or immutable/permanent) socket on an item is defined here, along with the plug that is permanently affixed to the socket. |
| `socketCategories` | `Destiny.Definitions.DestinyItemSocketCategoryDefinition[]` | no | A convenience property, that refers to the sockets in the "sockets" property, pre-grouped by category and ordered in the manner that they should be grouped in the UI. You could form this yourself with the existing data, but why would you want to? Enjoy life man. |

### Destiny.Definitions.DestinyItemSocketCategoryDefinition

Sockets are grouped into categories in the UI. These define which category and which sockets are under that category.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `socketCategoryHash` | `integer(uint32)` | no | The hash for the Socket Category: a quick way to go get the header display information for the category. Use it to look up DestinySocketCategoryDefinition info. |
| `socketIndexes` | `integer(int32)[]` | no | Use these indexes to look up the sockets in the "sockets.socketEntries" property on the item definition. These are the indexes under the category, in game-rendered order. |

### Destiny.Definitions.DestinyItemSocketEntryDefinition

The definition information for a specific socket on an item. This will determine how the socket behaves in-game.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `socketTypeHash` | `integer(uint32)` | no | All sockets have a type, and this is the hash identifier for this particular type. Use it to look up the DestinySocketTypeDefinition: read there for more information on how socket types affect the behavior of the socket. |
| `singleInitialItemHash` | `integer(uint32)` | no | If a valid hash, this is the hash identifier for the DestinyInventoryItemDefinition representing the Plug that will be initially inserted into the item on item creation. Otherwise, this Socket will either start without a plug inserted, or will have one randomly inserted. |
| `reusablePlugItems` | `Destiny.Definitions.DestinyItemSocketEntryPlugItemDefinition[]` | no | This is a list of pre-determined plugs that can *always* be plugged into this socket, without the character having the plug in their inventory.<br>If this list is populated, you will not be allowed to plug an arbitrary item in the socket: you will only be able to choose from one of these reusable plugs. |
| `preventInitializationOnVendorPurchase` | `boolean` | no | If this is true, then the socket will not be initialized with a plug if the item is purchased from a Vendor.<br>Remember that Vendors are much more than conceptual vendors: they include "Collection Kiosks" and other entities. See DestinyVendorDefinition for more information. |
| `hidePerksInItemTooltip` | `boolean` | no | If this is true, the perks provided by this socket shouldn't be shown in the item's tooltip. This might be useful if it's providing a hidden bonus, or if the bonus is less important than other benefits on the item. |
| `plugSources` | `integer(int32)` | no | Indicates where you should go to get plugs for this socket. This will affect how you populate your UI, as well as what plugs are valid for this socket. It's an alternative to having to check for the existence of certain properties (reusablePlugItems for example) to infer where plugs should come from. |
| `reusablePlugSetHash` | `integer(uint32)` | no | If this socket's plugs come from a reusable DestinyPlugSetDefinition, this is the identifier for that set. We added this concept to reduce some major duplication that's going to come from sockets as replacements for what was once implemented as large sets of items and kiosks (like Emotes).<br> As of Shadowkeep, these will come up much more frequently and be driven by game content rather than custom curation. |
| `randomizedPlugSetHash` | `integer(uint32)` | no | This field replaces "randomizedPlugItems" as of Shadowkeep launch. If a socket has randomized plugs, this is a pointer to the set of plugs that could be used, as defined in DestinyPlugSetDefinition.<br> If null, the item has no randomized plugs. |
| `defaultVisible` | `boolean` | no | If true, then this socket is visible in the item's "default" state. If you have an instance, you should always check the runtime state, as that can override this visibility setting: but if you're looking at the item on a conceptual level, this property can be useful for hiding data such as legacy sockets - which remain defined on items for infrastructure purposes, but can be confusing for users to see. |

### Destiny.Definitions.DestinyItemSocketEntryPlugItemDefinition

The definition of a known, reusable plug that can be applied to a socket.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `plugItemHash` | `integer(uint32)` | no | The hash identifier of a DestinyInventoryItemDefinition representing the plug that can be inserted. |

### Destiny.Definitions.DestinyItemSocketEntryPlugItemRandomizedDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `craftingRequirements` | `Destiny.Definitions.DestinyPlugItemCraftingRequirements` | no |  |
| `currentlyCanRoll` | `boolean` | no | Indicates if the plug can be rolled on the current version of the item. For example, older versions of weapons may have plug rolls that are no longer possible on the current versions. |
| `plugItemHash` | `integer(uint32)` | no | The hash identifier of a DestinyInventoryItemDefinition representing the plug that can be inserted. |

### Destiny.Definitions.DestinyItemSourceBlockDefinition

Data about an item's "sources": ways that the item can be obtained.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `sourceHashes` | `integer(uint32)[]` | no | The list of hash identifiers for Reward Sources that hint where the item can be found (DestinyRewardSourceDefinition). |
| `sources` | `Destiny.Definitions.Sources.DestinyItemSourceDefinition[]` | no | A collection of details about the stats that were computed for the ways we found that the item could be spawned. |
| `exclusive` | `integer(int32)` | no | If we found that this item is exclusive to a specific platform, this will be set to the BungieMembershipType enumeration that matches that platform. |
| `vendorSources` | `Destiny.Definitions.DestinyItemVendorSourceReference[]` | no | A denormalized reference back to vendors that potentially sell this item. |

### Destiny.Definitions.DestinyItemStatBlockDefinition

Information about the item's calculated stats, with as much data as we can find for the stats without having an actual instance of the item.
Note that this means the entire concept of providing these stats is fundamentally insufficient: we cannot predict with 100% accuracy the conditions under which an item can spawn, so we use various heuristics to attempt to simulate the conditions as accurately as possible. Actual stats for items in-game can and will vary, but these should at least be useful base points for comparison and display.
It is also worth noting that some stats, like Magazine size, have further calculations performed on them by scripts in-game and on the game servers that BNet does not have access to. We cannot know how those stats are further transformed, and thus some stats will be inaccurate even on instances of items in BNet vs. how they appear in-game. This is a known limitation of our item statistics, without any planned fix.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `disablePrimaryStatDisplay` | `boolean` | no | If true, the game won't show the "primary" stat on this item when you inspect it.<br>NOTE: This is being manually mapped, because I happen to want it in a block that isn't going to directly create this derivative block. |
| `statGroupHash` | `integer(uint32)` | no | If the item's stats are meant to be modified by a DestinyStatGroupDefinition, this will be the identifier for that definition.<br>If you are using live data or precomputed stats data on the DestinyInventoryItemDefinition.stats.stats property, you don't have to worry about statGroupHash and how it alters stats: the already altered stats are provided to you. But if you want to see how the sausage gets made, or perform computations yourself, this is valuable information. |
| `stats` | `object` | no | If you are looking for precomputed values for the stats on a weapon, this is where they are stored. Technically these are the "Display" stat values. Please see DestinyStatsDefinition for what Display Stat Values means, it's a very long story... but essentially these are the closest values BNet can get to the item stats that you see in-game.<br>These stats are keyed by the DestinyStatDefinition's hash identifier for the stat that's found on the item. |
| `hasDisplayableStats` | `boolean` | no | A quick and lazy way to determine whether any stat other than the "primary" stat is actually visible on the item. Items often have stats that we return in case people find them useful, but they're not part of the "Stat Group" and thus we wouldn't display them in our UI. If this is False, then we're not going to display any of these stats other than the primary one. |
| `primaryBaseStatHash` | `integer(uint32)` | no | This stat is determined to be the "primary" stat, and can be looked up in the stats or any other stat collection related to the item.<br>Use this hash to look up the stat's value using DestinyInventoryItemDefinition.stats.stats, and the renderable data for the primary stat in the related DestinyStatDefinition. |

### Destiny.Definitions.DestinyItemSummaryBlockDefinition

This appears to be information used when rendering rewards. We don't currently use it on BNet.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `sortPriority` | `integer(int32)` | no | Apparently when rendering an item in a reward, this should be used as a sort priority. We're not doing it presently. |

### Destiny.Definitions.DestinyItemTalentGridBlockDefinition

This defines information that can only come from a talent grid on an item. Items mostly have negligible talent grid data these days, but instanced items still retain grids as a source for some of this common information.
Builds/Subclasses are the only items left that still have talent grids with meaningful Nodes.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `talentGridHash` | `integer(uint32)` | no | The hash identifier of the DestinyTalentGridDefinition attached to this item. |
| `itemDetailString` | `string` | no | This is meant to be a subtitle for looking at the talent grid. In practice, somewhat frustratingly, this always merely says the localized word for "Details". Great. Maybe it'll have more if talent grids ever get used for more than builds and subclasses again. |
| `buildName` | `string` | no | A shortcut string identifier for the "build" in question, if this talent grid has an associated build. Doesn't map to anything we can expose at the moment. |
| `hudDamageType` | `integer(int32)` | no | If the talent grid implies a damage type, this is the enum value for that damage type. |
| `hudIcon` | `string` | no | If the talent grid has a special icon that's shown in the game UI (like builds, funny that), this is the identifier for that icon. Sadly, we don't actually get that icon right now. I'll be looking to replace this with a path to the actual icon itself. |

### Destiny.Definitions.DestinyItemTooltipNotification

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayString` | `string` | no |  |
| `displayStyle` | `string` | no |  |

### Destiny.Definitions.DestinyItemTranslationBlockDefinition

This Block defines the rendering data associated with the item, if any.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `weaponPatternIdentifier` | `string` | no |  |
| `weaponPatternHash` | `integer(uint32)` | no |  |
| `defaultDyes` | `Destiny.DyeReference[]` | no |  |
| `lockedDyes` | `Destiny.DyeReference[]` | no |  |
| `customDyes` | `Destiny.DyeReference[]` | no |  |
| `arrangements` | `Destiny.Definitions.DestinyGearArtArrangementReference[]` | no |  |
| `hasGeometry` | `boolean` | no |  |

### Destiny.Definitions.DestinyItemValueBlockDefinition

This defines an item's "Value". Unfortunately, this appears to be used in different ways depending on the way that the item itself is used.
For items being sold at a Vendor, this is the default "sale price" of the item. These days, the vendor itself almost always sets the price, but it still possible for the price to fall back to this value. For quests, it is a preview of rewards you can gain by completing the quest. For dummy items, if the itemValue refers to an Emblem, it is the emblem that should be shown as the reward. (jeez louise)
It will likely be used in a number of other ways in the future, it appears to be a bucket where they put arbitrary items and quantities into the item.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemValue` | `Destiny.DestinyItemQuantity[]` | no | References to the items that make up this item's "value", and the quantity. |
| `valueDescription` | `string` | no | If there's a localized text description of the value provided, this will be said description. |

### Destiny.Definitions.DestinyItemVendorSourceReference

Represents that a vendor could sell this item, and provides a quick link to that vendor and sale item.
 Note that we do not and cannot make a guarantee that the vendor will ever *actually* sell this item, only that the Vendor has a definition that indicates it *could* be sold.
 Note also that a vendor may sell the same item in multiple "ways", which means there may be multiple vendorItemIndexes for a single Vendor hash.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorHash` | `integer(uint32)` | no | The identifier for the vendor that may sell this item. |
| `vendorItemIndexes` | `integer(int32)[]` | no | The Vendor sale item indexes that represent the sale information for this item. The same vendor may sell an item in multiple "ways", hence why this is a list. (for instance, a weapon may be "sold" as a reward in a quest, for Glimmer, and for Masterwork Cores: each of those ways would be represented by a different vendor sale item with a different index) |

### Destiny.Definitions.DestinyItemVersionDefinition

The version definition currently just holds a reference to the power cap.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `powerCapHash` | `integer(uint32)` | no | A reference to the power cap for this item version. |

### Destiny.Definitions.DestinyLocationDefinition

A "Location" is a sort of shortcut for referring to a specific combination of Activity, Destination, Place, and even Bubble or NavPoint within a space.
Most of this data isn't intrinsically useful to us, but Objectives refer to locations, and through that we can at least infer the Activity, Destination, and Place being referred to by the Objective.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorHash` | `integer(uint32)` | no | If the location has a Vendor on it, this is the hash identifier for that Vendor. Look them up with DestinyVendorDefinition. |
| `locationReleases` | `Destiny.Definitions.DestinyLocationReleaseDefinition[]` | no | A Location may refer to different specific spots in the world based on the world's current state. This is a list of those potential spots, and the data we can use at runtime to determine which one of the spots is the currently valid one. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyLocationReleaseDefinition

A specific "spot" referred to by a location. Only one of these can be active at a time for a given Location.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | Sadly, these don't appear to be populated anymore (ever?) |
| `smallTransparentIcon` | `string` | no |  |
| `mapIcon` | `string` | no |  |
| `largeTransparentIcon` | `string` | no |  |
| `spawnPoint` | `integer(uint32)` | no | If we had map information, this spawnPoint would be interesting. But sadly, we don't have that info. |
| `destinationHash` | `integer(uint32)` | no | The Destination being pointed to by this location. |
| `activityHash` | `integer(uint32)` | no | The Activity being pointed to by this location. |
| `activityGraphHash` | `integer(uint32)` | no | The Activity Graph being pointed to by this location. |
| `activityGraphNodeHash` | `integer(uint32)` | no | The Activity Graph Node being pointed to by this location. (Remember that Activity Graph Node hashes are only unique within an Activity Graph: so use the combination to find the node being spoken of) |
| `activityBubbleName` | `integer(uint32)` | no | The Activity Bubble within the Destination. Look this up in the DestinyDestinationDefinition's bubbles and bubbleSettings properties. |
| `activityPathBundle` | `integer(uint32)` | no | If we had map information, this would tell us something cool about the path this location wants you to take. I wish we had map information. |
| `activityPathDestination` | `integer(uint32)` | no | If we had map information, this would tell us about path information related to destination on the map. Sad. Maybe you can do something cool with it. Go to town man. |
| `navPointType` | `integer(int32)` | no | The type of Nav Point that this represents. See the enumeration for more info. |
| `worldPosition` | `integer(int32)[]` | no | Looks like it should be the position on the map, but sadly it does not look populated... yet? |

### Destiny.Definitions.DestinyMaterialRequirement

Many actions relating to items require you to expend materials: - Activating a talent node - Inserting a plug into a socket The items will refer to material requirements by a materialRequirementsHash in these cases, and this is the definition for those requirements in terms of the item required, how much of it is required and other interesting info. This is one of the rare/strange times where a single contract class is used both in definitions *and* in live data response contracts. I'm not sure yet whether I regret that.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemHash` | `integer(uint32)` | no | The hash identifier of the material required. Use it to look up the material's DestinyInventoryItemDefinition. |
| `deleteOnAction` | `boolean` | no | If True, the material will be removed from the character's inventory when the action is performed. |
| `count` | `integer(int32)` | no | The amount of the material required. |
| `countIsConstant` | `boolean` | no | If true, the material requirement count value is constant. Since The Witch Queen expansion, some material requirement counts can be dynamic and will need to be returned with an API call. |
| `omitFromRequirements` | `boolean` | no | If True, this requirement is "silent": don't bother showing it in a material requirements display. I mean, I'm not your mom: I'm not going to tell you you *can't* show it. But we won't show it in our UI. |
| `hasVirtualStackSize` | `boolean` | no | If true, this material requirement references a virtual item stack size value. You can get that value from a corresponding DestinyMaterialRequirementSetState. |

### Destiny.Definitions.DestinyMaterialRequirementSetDefinition

Represent a set of material requirements: Items that either need to be owned or need to be consumed in order to perform an action.
A variety of other entities refer to these as gatekeepers and payments for actions that can be performed in game.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `materials` | `Destiny.Definitions.DestinyMaterialRequirement[]` | no | The list of all materials that are required. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyMedalTierDefinition

An artificial construct of our own creation, to try and put some order on top of Medals and keep them from being one giant, unmanageable and unsorted blob of stats.
Unfortunately, we haven't had time to do this evaluation yet in Destiny 2, so we're short on Medal Tiers. This will hopefully be updated over time, if Medals continue to exist.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `tierName` | `string` | no | The name of the tier. |
| `order` | `integer(int32)` | no | If you're rendering medals by tier, render them in this order (ascending) |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyNodeActivationRequirement

Talent nodes have requirements that must be met before they can be activated.
This describes the material costs, the Level of the Talent Grid's progression required, and other conditional information that limits whether a talent node can be activated.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `gridLevel` | `integer(int32)` | no | The Progression level on the Talent Grid required to activate this node.<br>See DestinyTalentGridDefinition.progressionHash for the related Progression, and read DestinyProgressionDefinition's documentation to learn more about Progressions. |
| `materialRequirementHashes` | `integer(uint32)[]` | no | The list of hash identifiers for material requirement sets: materials that are required for the node to be activated. See DestinyMaterialRequirementSetDefinition for more information about material requirements.<br>In this case, only a single DestinyMaterialRequirementSetDefinition will be chosen from this list, and we won't know which one will be chosen until an instance of the item is created. |

### Destiny.Definitions.DestinyNodeSocketReplaceResponse

This is a bit of an odd duck. Apparently, if talent nodes steps have this data, the game will go through on step activation and alter the first Socket it finds on the item that has a type matching the given socket type, inserting the indicated plug item.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `socketTypeHash` | `integer(uint32)` | no | The hash identifier of the socket type to find amidst the item's sockets (the item to which this talent grid is attached). See DestinyInventoryItemDefinition.sockets.socketEntries to find the socket type of sockets on the item in question. |
| `plugItemHash` | `integer(uint32)` | no | The hash identifier of the plug item that will be inserted into the socket found. |

### Destiny.Definitions.DestinyNodeStepDefinition

This defines the properties of a "Talent Node Step". When you see a talent node in game, the actual visible properties that you see (its icon, description, the perks and stats it provides) are not provided by the Node itself, but rather by the currently active Step on the node.
When a Talent Node is activated, the currently active step's benefits are conferred upon the item and character.
The currently active step on talent nodes are determined when an item is first instantiated. Sometimes it is random, sometimes it is more deterministic (particularly when a node has only a single step).
Note that, when dealing with Talent Node Steps, you must ensure that you have the latest version of content. stepIndex and nodeStepHash - two ways of identifying the step within a node - are both content version dependent, and thus are subject to change between content updates.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | These are the display properties actually used to render the Talent Node. The currently active step's displayProperties are shown. |
| `stepIndex` | `integer(int32)` | no | The index of this step in the list of Steps on the Talent Node.<br>Unfortunately, this is the closest thing we have to an identifier for the Step: steps are not provided a content version agnostic identifier. This means that, when you are dealing with talent nodes, you will need to first ensure that you have the latest version of content. |
| `nodeStepHash` | `integer(uint32)` | no | The hash of this node step. Unfortunately, while it can be used to uniquely identify the step within a node, it is also content version dependent and should not be relied on without ensuring you have the latest vesion of content. |
| `interactionDescription` | `string` | no | If you can interact with this node in some way, this is the localized description of that interaction. |
| `damageType` | `integer(int32)` | no | An enum representing a damage type granted by activating this step, if any. |
| `damageTypeHash` | `integer(uint32)` | no | If the step provides a damage type, this will be the hash identifier used to look up the damage type's DestinyDamageTypeDefinition. |
| `activationRequirement` | `object` | no | If the step has requirements for activation (they almost always do, if nothing else than for the Talent Grid's Progression to have reached a certain level), they will be defined here. |
| `canActivateNextStep` | `boolean` | no | There was a time when talent nodes could be activated multiple times, and the effects of subsequent Steps would be compounded on each other, essentially "upgrading" the node. We have moved away from this, but theoretically the capability still exists.<br>I continue to return this in case it is used in the future: if true and this step is the current step in the node, you are allowed to activate the node a second time to receive the benefits of the next step in the node, which will then become the active step. |
| `nextStepIndex` | `integer(int32)` | no | The stepIndex of the next step in the talent node, or -1 if this is the last step or if the next step to be chosen is random.<br>This doesn't really matter anymore unless canActivateNextStep begins to be used again. |
| `isNextStepRandom` | `boolean` | no | If true, the next step to be chosen is random, and if you're allowed to activate the next step. (if canActivateNextStep = true) |
| `perkHashes` | `integer(uint32)[]` | no | The list of hash identifiers for Perks (DestinySandboxPerkDefinition) that are applied when this step is active. Perks provide a variety of benefits and modifications - examine DestinySandboxPerkDefinition to learn more. |
| `startProgressionBarAtProgress` | `integer(int32)` | no | When the Talent Grid's progression reaches this value, the circular "progress bar" that surrounds the talent node should be shown.<br>This also indicates the lower bound of said progress bar, with the upper bound being the progress required to reach activationRequirement.gridLevel. (at some point I should precalculate the upper bound and put it in the definition to save people time) |
| `statHashes` | `integer(uint32)[]` | no | When the step provides stat benefits on the item or character, this is the list of hash identifiers for stats (DestinyStatDefinition) that are provided. |
| `affectsQuality` | `boolean` | no | If this is true, the step affects the item's Quality in some way. See DestinyInventoryItemDefinition for more information about the meaning of Quality. I already made a joke about Zen and the Art of Motorcycle Maintenance elsewhere in the documentation, so I will avoid doing it again. Oops too late |
| `stepGroups` | `object` | no | In Destiny 1, the Armory's Perk Filtering was driven by a concept of TalentNodeStepGroups: categorizations of talent nodes based on their functionality. While the Armory isn't a BNet-facing thing for now, and the new Armory will need to account for Sockets rather than Talent Nodes, this categorization capability feels useful enough to still keep around. |
| `affectsLevel` | `boolean` | no | If true, this step can affect the level of the item. See DestinyInventoryItemDefintion for more information about item levels and their effect on stats. |
| `socketReplacements` | `Destiny.Definitions.DestinyNodeSocketReplaceResponse[]` | no | If this step is activated, this will be a list of information used to replace socket items with new Plugs. See DestinyInventoryItemDefinition for more information about sockets and plugs. |

### Destiny.Definitions.DestinyObjectiveDefinition

Defines an "Objective".
An objective is a specific task you should accomplish in the game. These are referred to by:
- Quest Steps (which are DestinyInventoryItemDefinition entities with Objectives)
- Challenges (which are Objectives defined on an DestinyActivityDefintion)
- Milestones (which refer to Objectives that are defined on both Quest Steps and Activities)
- Anything else that the designers decide to do later.
Objectives have progress, a notion of having been Completed, human readable data describing the task to be accomplished, and a lot of optional tack-on data that can enhance the information provided about the task.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | Ideally, this should tell you what your task is. I'm not going to lie to you though. Sometimes this doesn't have useful information at all. Which sucks, but there's nothing either of us can do about it. |
| `completionValue` | `integer(int32)` | no | The value that the unlock value defined in unlockValueHash must reach in order for the objective to be considered Completed. Used in calculating progress and completion status. |
| `scope` | `integer(int32)` | no | A shortcut for determining the most restrictive gating that this Objective is set to use. This includes both the dynamic determination of progress and of completion values. See the DestinyGatingScope enum's documentation for more details. |
| `locationHash` | `integer(uint32)` | no | OPTIONAL: a hash identifier for the location at which this objective must be accomplished, if there is a location defined. Look up the DestinyLocationDefinition for this hash for that additional location info. |
| `allowNegativeValue` | `boolean` | no | If true, the value is allowed to go negative. |
| `allowValueChangeWhenCompleted` | `boolean` | no | If true, you can effectively "un-complete" this objective if you lose progress after crossing the completion threshold. <br>If False, once you complete the task it will remain completed forever by locking the value. |
| `isCountingDownward` | `boolean` | no | If true, completion means having an unlock value less than or equal to the completionValue.<br>If False, completion means having an unlock value greater than or equal to the completionValue. |
| `valueStyle` | `integer(int32)` | no | The UI style applied to the objective. It's an enum, take a look at DestinyUnlockValueUIStyle for details of the possible styles. Use this info as you wish to customize your UI.<br>DEPRECATED: This is no longer populated by Destiny 2 game content. Please use inProgressValueStyle and completedValueStyle instead. |
| `progressDescription` | `string` | no | Text to describe the progress bar. |
| `perks` | `object` | no | If this objective enables Perks intrinsically, the conditions for that enabling are defined here. |
| `stats` | `object` | no | If this objective enables modifications on a player's stats intrinsically, the conditions are defined here. |
| `minimumVisibilityThreshold` | `integer(int32)` | no | If nonzero, this is the minimum value at which the objective's progression should be shown. Otherwise, don't show it yet. |
| `allowOvercompletion` | `boolean` | no | If True, the progress will continue even beyond the point where the objective met its minimum completion requirements. Your UI will have to accommodate it. |
| `showValueOnComplete` | `boolean` | no | If True, you should continue showing the progression value in the UI after it's complete. I mean, we already do that in BNet anyways, but if you want to be better behaved than us you could honor this flag. |
| `completedValueStyle` | `integer(int32)` | no | The style to use when the objective is completed. |
| `inProgressValueStyle` | `integer(int32)` | no | The style to use when the objective is still in progress. |
| `uiLabel` | `string` | no | Objectives can have arbitrary UI-defined identifiers that define the style applied to objectives. For convenience, known UI labels will be defined in the uiStyle enum value. |
| `uiStyle` | `integer(int32)` | no | If the objective has a known UI label value, this property will represent it. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyObjectiveDisplayProperties

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no | The activity associated with this objective in the context of this item, if any. |
| `displayOnItemPreviewScreen` | `boolean` | no | If true, the game shows this objective on item preview screens. |

### Destiny.Definitions.DestinyObjectivePerkEntryDefinition

Defines the conditions under which an intrinsic perk is applied while participating in an Objective.
These perks will generally not be benefit-granting perks, but rather a perk that modifies gameplay in some interesting way.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `perkHash` | `integer(uint32)` | no | The hash identifier of the DestinySandboxPerkDefinition that will be applied to the character. |
| `style` | `integer(int32)` | no | An enumeration indicating whether it will be applied as long as the Objective is active, when it's completed, or until it's completed. |

### Destiny.Definitions.DestinyObjectiveStatEntryDefinition

Defines the conditions under which stat modifications will be applied to a Character while participating in an objective.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `stat` | `object` | no | The stat being modified, and the value used. |
| `style` | `integer(int32)` | no | Whether it will be applied as long as the objective is active, when it's completed, or until it's completed. |

### Destiny.Definitions.DestinyPlaceDefinition

Okay, so Activities (DestinyActivityDefinition) take place in Destinations (DestinyDestinationDefinition). Destinations are part of larger locations known as Places (you're reading its documentation right now).
Places are more on the planetary scale, like "Earth" and "Your Mom."

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyPlugItemCraftingRequirements

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `unlockRequirements` | `Destiny.Definitions.DestinyPlugItemCraftingUnlockRequirement[]` | no |  |
| `requiredLevel` | `integer(int32)` | no | If the plug has a known level requirement, it'll be available here. |
| `materialRequirementHashes` | `integer(uint32)[]` | no |  |

### Destiny.Definitions.DestinyPlugItemCraftingUnlockRequirement

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `failureDescription` | `string` | no |  |

### Destiny.Definitions.DestinyProgressionDefinition

A "Progression" in Destiny is best explained by an example.
A Character's "Level" is a progression: it has Experience that can be earned, levels that can be gained, and is evaluated and displayed at various points in the game. A Character's "Faction Reputation" is also a progression for much the same reason.
Progression is used by a variety of systems, and the definition of a Progression will generally only be useful if combining with live data (such as a character's DestinyCharacterProgressionComponent.progressions property, which holds that character's live Progression states).
Fundamentally, a Progression measures your "Level" by evaluating the thresholds in its Steps (one step per level, except for the last step which can be repeated indefinitely for "Levels" that have no ceiling) against the total earned "progression points"/experience. (for simplicity purposes, we will henceforth refer to earned progression points as experience, though it need not be a mechanic that in any way resembles Experience in a traditional sense).
Earned experience is calculated in a variety of ways, determined by the Progression's scope. These go from looking up a stored value to performing exceedingly obtuse calculations. This is why we provide live data in DestinyCharacterProgressionComponent.progressions, so you don't have to worry about those.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.DestinyProgressionDisplayPropertiesDefinition` | no |  |
| `scope` | `integer(int32)` | no | The "Scope" of the progression indicates the source of the progression's live data.<br>See the DestinyProgressionScope enum for more info: but essentially, a Progression can either be backed by a stored value, or it can be a calculated derivative of other values. |
| `repeatLastStep` | `boolean` | no | If this is True, then the progression doesn't have a maximum level. |
| `source` | `string` | no | If there's a description of how to earn this progression in the local config, this will be that localized description. |
| `steps` | `Destiny.Definitions.DestinyProgressionStepDefinition[]` | no | Progressions are divided into Steps, which roughly equate to "Levels" in the traditional sense of a Progression. Notably, the last step can be repeated indefinitely if repeatLastStep is true, meaning that the calculation for your level is not as simple as comparing your current progress to the max progress of the steps. <br>These and more calculations are done for you if you grab live character progression data, such as in the DestinyCharacterProgressionComponent. |
| `visible` | `boolean` | no | If true, the Progression is something worth showing to users.<br>If false, BNet isn't going to show it. But that doesn't mean you can't. We're all friends here. |
| `factionHash` | `integer(uint32)` | no | If the value exists, this is the hash identifier for the Faction that owns this Progression.<br>This is purely for convenience, if you're looking at a progression and want to know if and who it's related to in terms of Faction Reputation. |
| `color` | `object` | no | The #RGB string value for the color related to this progression, if there is one. |
| `rankIcon` | `string` | no | For progressions that have it, this is the rank icon we use in the Companion, displayed above the progressions' rank value. |
| `rewardItems` | `Destiny.Definitions.DestinyProgressionRewardItemQuantity[]` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyProgressionDisplayPropertiesDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayUnitsName` | `string` | no | When progressions show your "experience" gained, that bar has units (i.e. "Experience", "Bad Dudes Snuffed Out", whatever). This is the localized string for that unit of measurement. |
| `description` | `string` | no |  |
| `name` | `string` | no |  |
| `icon` | `string` | no | Note that "icon" is sometimes misleading, and should be interpreted in the context of the entity. For instance, in Destiny 1 the DestinyRecordBookDefinition's icon was a big picture of a book.<br>But usually, it will be a small square image that you can use as... well, an icon.<br>They are currently represented as 96px x 96px images. |
| `iconHash` | `integer(uint32)` | no |  |
| `iconSequences` | `Destiny.Definitions.Common.DestinyIconSequenceDefinition[]` | no |  |
| `highResIcon` | `string` | no | If this item has a high-res icon (at least for now, many things won't), then the path to that icon will be here. |
| `hasIcon` | `boolean` | no |  |

### Destiny.Definitions.DestinyProgressionMappingDefinition

Aggregations of multiple progressions.
These are used to apply rewards to multiple progressions at once. They can sometimes have human readable data as well, but only extremely sporadically.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | Infrequently defined in practice. Defer to the individual progressions' display properties. |
| `displayUnits` | `string` | no | The localized unit of measurement for progression across the progressions defined in this mapping. Unfortunately, this is very infrequently defined. Defer to the individual progressions' display units. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyProgressionRewardDefinition

Inventory Items can reward progression when actions are performed on them. A common example of this in Destiny 1 was Bounties, which would reward Experience on your Character and the like when you completed the bounty.
Note that this maps to a DestinyProgressionMappingDefinition, and *not* a DestinyProgressionDefinition directly. This is apparently so that multiple progressions can be granted progression points/experience at the same time.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `progressionMappingHash` | `integer(uint32)` | no | The hash identifier of the DestinyProgressionMappingDefinition that contains the progressions for which experience should be applied. |
| `amount` | `integer(int32)` | no | The amount of experience to give to each of the mapped progressions. |
| `applyThrottles` | `boolean` | no | If true, the game's internal mechanisms to throttle progression should be applied. |

### Destiny.Definitions.DestinyProgressionRewardItemQuantity

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `rewardItemIndex` | `integer(int32)` | no |  |
| `rewardedAtProgressionLevel` | `integer(int32)` | no |  |
| `acquisitionBehavior` | `integer(int32)` | no |  |
| `uiDisplayStyle` | `string` | no |  |
| `claimUnlockDisplayStrings` | `string[]` | no |  |
| `socketOverrides` | `Destiny.Definitions.DestinyProgressionSocketPlugOverride[]` | no |  |
| `itemHash` | `integer(uint32)` | no | The hash identifier for the item in question. Use it to look up the item's DestinyInventoryItemDefinition. |
| `itemInstanceId` | `integer(int64)` | no | If this quantity is referring to a specific instance of an item, this will have the item's instance ID. Normally, this will be null. |
| `quantity` | `integer(int32)` | no | The amount of the item needed/available depending on the context of where DestinyItemQuantity is being used. |
| `hasConditionalVisibility` | `boolean` | no | Indicates that this item quantity may be conditionally shown or hidden, based on various sources of state. For example: server flags, account state, or character progress. |

### Destiny.Definitions.DestinyProgressionSocketPlugOverride

The information for how progression item definitions should override a given socket with custom plug data.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `socketTypeHash` | `integer(uint32)` | no |  |
| `overrideSingleItemHash` | `integer(uint32)` | no |  |

### Destiny.Definitions.DestinyProgressionStepDefinition

This defines a single Step in a progression (which roughly equates to a level. See DestinyProgressionDefinition for caveats).

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `stepName` | `string` | no | Very rarely, Progressions will have localized text describing the Level of the progression. This will be that localized text, if it exists. Otherwise, the standard appears to be to simply show the level numerically. |
| `displayEffectType` | `integer(int32)` | no | This appears to be, when you "level up", whether a visual effect will display and on what entity. See DestinyProgressionStepDisplayEffect for slightly more info. |
| `progressTotal` | `integer(int32)` | no | The total amount of progression points/"experience" you will need to initially reach this step. If this is the last step and the progression is repeating indefinitely (DestinyProgressionDefinition.repeatLastStep), this will also be the progress needed to level it up further by repeating this step again. |
| `rewardItems` | `Destiny.DestinyItemQuantity[]` | no | A listing of items rewarded as a result of reaching this level. |
| `icon` | `string` | no | If this progression step has a specific icon related to it, this is the icon to show. |

### Destiny.Definitions.DestinyRaceDefinition

In Destiny, "Races" are really more like "Species". Sort of. I mean, are the Awoken a separate species from humans? I'm not sure. But either way, they're defined here. You'll see Exo, Awoken, and Human as examples of these Species. Players will choose one for their character.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `raceType` | `integer(int32)` | no | An enumeration defining the existing, known Races/Species for player characters. This value will be the enum value matching this definition. |
| `genderedRaceNames` | `object` | no | A localized string referring to the singular form of the Race's name when referred to in gendered form. Keyed by the DestinyGender. |
| `genderedRaceNamesByGenderHash` | `object` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyRewardSourceCategory

BNet's custom categorization of reward sources. We took a look at the existing ways that items could be spawned, and tried to make high-level categorizations of them. This needs to be re-evaluated for Destiny 2.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.Definitions.DestinyRewardSourceDefinition

Represents a heuristically-determined "item source" according to Bungie.net. These item sources are non-canonical: we apply a combination of special configuration and often-fragile heuristics to attempt to discern whether an item should be part of a given "source," but we have known cases of false positives and negatives due to our imperfect heuristics.
Still, they provide a decent approximation for people trying to figure out how an item can be obtained. DestinyInventoryItemDefinition refers to sources in the sourceDatas.sourceHashes property for all sources we determined the item could spawn from.
An example in Destiny 1 of a Source would be "Nightfall". If an item has the "Nightfall" source associated with it, it's extremely likely that you can earn that item while playing Nightfall, either during play or as an after-completion reward.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `category` | `integer(int32)` | no | Sources are grouped into categories: common ways that items are provided. I hope to see this expand in Destiny 2 once we have time to generate accurate reward source data. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinySandboxPatternDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `patternHash` | `integer(uint32)` | no |  |
| `patternGlobalTagIdHash` | `integer(uint32)` | no |  |
| `weaponContentGroupHash` | `integer(uint32)` | no |  |
| `weaponTranslationGroupHash` | `integer(uint32)` | no |  |
| `weaponTypeHash` | `integer(uint32)` | no |  |
| `weaponType` | `integer(int32)` | no |  |
| `filters` | `Destiny.Definitions.DestinyArrangementRegionFilterDefinition[]` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinySandboxPerkDefinition

Perks are modifiers to a character or item that can be applied situationally.
- Perks determine a weapon's damage type.
- Perks put the Mods in Modifiers (they are literally the entity that bestows the Sandbox benefit for whatever fluff text about the modifier in the Socket, Plug or Talent Node)
- Perks are applied for unique alterations of state in Objectives
Anyways, I'm sure you can see why perks are so interesting.
What Perks often don't have is human readable information, so we attempt to reverse engineer that by pulling that data from places that uniquely refer to these perks: namely, Talent Nodes and Plugs. That only gives us a subset of perks that are human readable, but those perks are the ones people generally care about anyways. The others are left as a mystery, their true purpose mostly unknown and undocumented.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | These display properties are by no means guaranteed to be populated. Usually when it is, it's only because we back-filled them with the displayProperties of some Talent Node or Plug item that happened to be uniquely providing that perk. |
| `perkIdentifier` | `string` | no | The string identifier for the perk. |
| `isDisplayable` | `boolean` | no | If true, you can actually show the perk in the UI. Otherwise, it doesn't have useful player-facing information. |
| `damageType` | `integer(int32)` | no | If this perk grants a damage type to a weapon, the damage type will be defined here.<br>Unless you have a compelling reason to use this enum value, use the damageTypeHash instead to look up the actual DestinyDamageTypeDefinition. |
| `damageTypeHash` | `integer(uint32)` | no | The hash identifier for looking up the DestinyDamageTypeDefinition, if this perk has a damage type.<br>This is preferred over using the damageType enumeration value, which has been left purely because it is occasionally convenient. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyStatDefinition

This represents a stat that's applied to a character or an item (such as a weapon, piece of armor, or a vehicle).
An example of a stat might be Attack Power on a weapon.
Stats go through a complex set of transformations before they end up being shown to the user as a number or a progress bar, and those transformations are fundamentally intertwined with the concept of a "Stat Group" (DestinyStatGroupDefinition). Items have both Stats and a reference to a Stat Group, and it is the Stat Group that takes the raw stat information and gives it both rendering metadata (such as whether to show it as a number or a progress bar) and the final transformation data (interpolation tables to turn the raw investment stat into a display stat). Please see DestinyStatGroupDefinition for more information on that transformational process.
Stats are segregated from Stat Groups because different items and types of items can refer to the same stat, but have different "scales" for the stat while still having the same underlying value. For example, both a Shotgun and an Auto Rifle may have a "raw" impact stat of 50, but the Auto Rifle's Stat Group will scale that 50 down so that, when it is displayed, it is a smaller value relative to the shotgun. (this is a totally made up example, don't assume shotguns have naturally higher impact than auto rifles because of this)
A final caveat is that some stats, even after this "final" transformation, go through yet another set of transformations directly in the game as a result of dynamic, stateful scripts that get run. BNet has no access to these scripts, nor any way to know which scripts get executed. As a result, the stats for an item that you see in-game - particularly for stats that are often impacted by Perks, like Magazine Size - can change dramatically from what we return on Bungie.Net. This is a known issue with no fix coming down the pipeline. Take these stats with a grain of salt.
Stats actually go through four transformations, for those interested:
1) "Sandbox" stat, the "most raw" form. These are pretty much useless without transformations applied, and thus are not currently returned in the API. If you really want these, we can provide them. Maybe someone could do something cool with it?
2) "Investment" stat (the stat's value after DestinyStatDefinition's interpolation tables and aggregation logic is applied to the "Sandbox" stat value)
3) "Display" stat (the stat's base UI-visible value after DestinyStatGroupDefinition's interpolation tables are applied to the Investment Stat value. For most stats, this is what is displayed.)
4) Underlying in-game stat (the stat's actual value according to the game, after the game runs dynamic scripts based on the game and character's state. This is the final transformation that BNet does not have access to. For most stats, this is not actually displayed to the user, with the exception of Magazine Size which is then piped back to the UI for display in-game, but not to BNet.)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `aggregationType` | `integer(int32)` | no | Stats can exist on a character or an item, and they may potentially be aggregated in different ways. The DestinyStatAggregationType enum value indicates the way that this stat is being aggregated. |
| `hasComputedBlock` | `boolean` | no | True if the stat is computed rather than being delivered as a raw value on items.<br>For instance, the Light stat in Destiny 1 was a computed stat. |
| `statCategory` | `integer(int32)` | no | The category of the stat, according to the game. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyStatDisplayDefinition

Describes the way that an Item Stat (see DestinyStatDefinition) is transformed using the DestinyStatGroupDefinition related to that item. See both of the aforementioned definitions for more information about the stages of stat transformation.
This represents the transformation of a stat into a "Display" stat (the closest value that BNet can get to the in-game display value of the stat)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `statHash` | `integer(uint32)` | no | The hash identifier for the stat being transformed into a Display stat.<br>Use it to look up the DestinyStatDefinition, or key into a DestinyInventoryItemDefinition's stats property. |
| `maximumValue` | `integer(int32)` | no | Regardless of the output of interpolation, this is the maximum possible value that the stat can be. It should also be used as the upper bound for displaying the stat as a progress bar (the minimum always being 0) |
| `displayAsNumeric` | `boolean` | no | If this is true, the stat should be displayed as a number. Otherwise, display it as a progress bar. Or, you know, do whatever you want. There's no displayAsNumeric police. |
| `displayInterpolation` | `Interpolation.InterpolationPoint[]` | no | The interpolation table representing how the Investment Stat is transformed into a Display Stat. <br>See DestinyStatDefinition for a description of the stages of stat transformation. |

### Destiny.Definitions.DestinyStatGroupDefinition

When an inventory item (DestinyInventoryItemDefinition) has Stats (such as Attack Power), the item will refer to a Stat Group. This definition enumerates the properties used to transform the item's "Investment" stats into "Display" stats.
See DestinyStatDefinition's documentation for information about the transformation of Stats, and the meaning of an Investment vs. a Display stat.
If you don't want to do these calculations on your own, fear not: pulling live data from the BNet endpoints will return display stat values pre-computed and ready for you to use. I highly recommend this approach, saves a lot of time and also accounts for certain stat modifiers that can't easily be accounted for without live data (such as stat modifiers on Talent Grids and Socket Plugs)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `maximumValue` | `integer(int32)` | no | The maximum possible value that any stat in this group can be transformed into.<br>This is used by stats that *don't* have scaledStats entries below, but that still need to be displayed as a progress bar, in which case this is used as the upper bound for said progress bar. (the lower bound is always 0) |
| `uiPosition` | `integer(int32)` | no | This apparently indicates the position of the stats in the UI? I've returned it in case anyone can use it, but it's not of any use to us on BNet. Something's being lost in translation with this value. |
| `scaledStats` | `Destiny.Definitions.DestinyStatDisplayDefinition[]` | no | Any stat that requires scaling to be transformed from an "Investment" stat to a "Display" stat will have an entry in this list. For more information on what those types of stats mean and the transformation process, see DestinyStatDefinition.<br>In retrospect, I wouldn't mind if this was a dictionary keyed by the stat hash instead. But I'm going to leave it be because [[After Apple Picking]]. |
| `overrides` | `object` | no | The game has the ability to override, based on the stat group, what the localized text is that is displayed for Stats being shown on the item.<br>Mercifully, no Stat Groups use this feature currently. If they start using them, we'll all need to start using them (and those of you who are more prudent than I am can go ahead and start pre-checking for this.) |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyStatOverrideDefinition

Stat Groups (DestinyStatGroupDefinition) has the ability to override the localized text associated with stats that are to be shown on the items with which they are associated.
This defines a specific overridden stat. You could theoretically check these before rendering your stat UI, and for each stat that has an override show these displayProperties instead of those on the DestinyStatDefinition.
Or you could be like us, and skip that for now because the game has yet to actually use this feature. But know that it's here, waiting for a resilliant young designer to take up the mantle and make us all look foolish by showing the wrong name for stats.
Note that, if this gets used, the override will apply only to items using the overriding Stat Group. Other items will still show the default stat's name/description.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `statHash` | `integer(uint32)` | no | The hash identifier of the stat whose display properties are being overridden. |
| `displayProperties` | `object` | no | The display properties to show instead of the base DestinyStatDefinition display properties. |

### Destiny.Definitions.DestinyTalentExclusiveGroup

As of Destiny 2, nodes can exist as part of "Exclusive Groups". These differ from exclusive sets in that, within the group, many nodes can be activated. But the act of activating any node in the group will cause "opposing" nodes (nodes in groups that are not allowed to be activated at the same time as this group) to deactivate.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `groupHash` | `integer(uint32)` | no | The identifier for this exclusive group. Only guaranteed unique within the talent grid, not globally. |
| `loreHash` | `integer(uint32)` | no | If this group has an associated piece of lore to show next to it, this will be the identifier for that DestinyLoreDefinition. |
| `nodeHashes` | `integer(uint32)[]` | no | A quick reference of the talent nodes that are part of this group, by their Talent Node hashes. (See DestinyTalentNodeDefinition.nodeHash) |
| `opposingGroupHashes` | `integer(uint32)[]` | no | A quick reference of Groups whose nodes will be deactivated if any node in this group is activated. |
| `opposingNodeHashes` | `integer(uint32)[]` | no | A quick reference of Nodes that will be deactivated if any node in this group is activated, by their Talent Node hashes. (See DestinyTalentNodeDefinition.nodeHash) |

### Destiny.Definitions.DestinyTalentGridDefinition

The time has unfortunately come to talk about Talent Grids.
Talent Grids are the most complex and unintuitive part of the Destiny Definition data. Grab a cup of coffee before we begin, I can wait.
Talent Grids were the primary way that items could be customized in Destiny 1. In Destiny 2, for now, talent grids have become exclusively used by Subclass/Build items: but the system is still in place for it to be used by items should the direction change back toward talent grids.
Talent Grids have Nodes: the visual circles on the talent grid detail screen that have icons and can be activated if you meet certain requirements and pay costs. The actual visual data and effects, however, are driven by the "Steps" on Talent Nodes. Any given node will have 1:M of these steps, and the specific step that will be considered the "current" step (and thus the dictator of all benefits, visual state, and activation requirements on the Node) will almost always not be determined until an instance of the item is created. This is how, in Destiny 1, items were able to have such a wide variety of what users saw as "Perks": they were actually Talent Grids with nodes that had a wide variety of Steps, randomly chosen at the time of item creation.
Now that Talent Grids are used exclusively by subclasses and builds, all of the properties within still apply: but there are additional visual elements on the Subclass/Build screens that are superimposed on top of the talent nodes. Unfortunately, BNet doesn't have this data: if you want to build a subclass screen, you will have to provide your own "decorative" assets, such as the visual connectors between nodes and the fancy colored-fire-bathed character standing behind the nodes.
DestinyInventoryItem.talentGrid.talentGridHash defines an item's linked Talent Grid, which brings you to this definition that contains enough satic data about talent grids to make your head spin. These *must* be combined with instanced data - found when live data returns DestinyItemTalentGridComponent - in order to derive meaning. The instanced data will reference nodes and steps within these definitions, which you will then have to look up in the definition and combine with the instanced data to give the user the visual representation of their item's talent grid.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `maxGridLevel` | `integer(int32)` | no | The maximum possible level of the Talent Grid: at this level, any nodes are allowed to be activated. |
| `gridLevelPerColumn` | `integer(int32)` | no | The meaning of this has been lost in the sands of time: it still exists as a property, but appears to be unused in the modern UI of talent grids. It used to imply that each visual "column" of talent nodes required identical progression levels in order to be activated. Returning this value in case it is still useful to someone? Perhaps it's just a bit of interesting history. |
| `progressionHash` | `integer(uint32)` | no | The hash identifier of the Progression (DestinyProgressionDefinition) that drives whether and when Talent Nodes can be activated on the Grid. Items will have instances of this Progression, and will gain experience that will eventually cause the grid to increase in level. As the grid's level increases, it will cross the threshold where nodes can be activated. See DestinyTalentGridStepDefinition's activation requirements for more information. |
| `nodes` | `Destiny.Definitions.DestinyTalentNodeDefinition[]` | no | The list of Talent Nodes on the Grid (recall that Nodes themselves are really just locations in the UI to show whatever their current Step is. You will only know the current step for a node by retrieving instanced data through platform calls to the API that return DestinyItemTalentGridComponent). |
| `exclusiveSets` | `Destiny.Definitions.DestinyTalentNodeExclusiveSetDefinition[]` | no | Talent Nodes can exist in "exclusive sets": these are sets of nodes in which only a single node in the set can be activated at any given time. Activating a node in this set will automatically deactivate the other nodes in the set (referred to as a "Swap").<br>If a node in the exclusive set has already been activated, the game will not charge you materials to activate another node in the set, even if you have never activated it before, because you already paid the cost to activate one node in the set.<br>Not to be confused with Exclusive Groups. (how the heck do we NOT get confused by that? Jeez) See the groups property for information about that only-tangentially-related concept. |
| `independentNodeIndexes` | `integer(int32)[]` | no | This is a quick reference to the indexes of nodes that are not part of exclusive sets. Handy for knowing which talent nodes can only be activated directly, rather than via swapping. |
| `groups` | `object` | no | Talent Nodes can have "Exclusive Groups". These are not to be confused with Exclusive Sets (see exclusiveSets property).<br>Look at the definition of DestinyTalentExclusiveGroup for more information and how they work. These groups are keyed by the "groupHash" from DestinyTalentExclusiveGroup. |
| `nodeCategories` | `Destiny.Definitions.DestinyTalentNodeCategory[]` | no | BNet wants to show talent nodes grouped by similar purpose with localized titles. This is the ordered list of those categories: if you want to show nodes by category, you can iterate over this list, render the displayProperties for the category as the title, and then iterate over the talent nodes referenced by the category to show the related nodes.<br>Note that this is different from Exclusive Groups or Sets, because these categories also incorporate "Independent" nodes that belong to neither sets nor groups. These are purely for visual grouping of nodes rather than functional grouping. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyTalentNodeCategory

An artificial construct provided by Bungie.Net, where we attempt to group talent nodes by functionality.
This is a single set of references to Talent Nodes that share a common trait or purpose.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `identifier` | `string` | no | Mostly just for debug purposes, but if you find it useful you can have it. This is BNet's manually created identifier for this category. |
| `isLoreDriven` | `boolean` | no | If true, we found the localized content in a related DestinyLoreDefinition instead of local BNet localization files. This is mostly for ease of my own future investigations. |
| `displayProperties` | `object` | no | Will contain at least the "name", which will be the title of the category. We will likely not have description and an icon yet, but I'm going to keep my options open. |
| `nodeHashes` | `integer(uint32)[]` | no | The set of all hash identifiers for Talent Nodes (DestinyTalentNodeDefinition) in this Talent Grid that are part of this Category. |

### Destiny.Definitions.DestinyTalentNodeDefinition

Talent Grids on items have Nodes. These nodes have positions in the talent grid's UI, and contain "Steps" (DestinyTalentNodeStepDefinition), one of whom will be the "Current" step.
The Current Step determines the visual properties of the node, as well as what the node grants when it is activated.
See DestinyTalentGridDefinition for a more complete overview of how Talent Grids work, and how they are used in Destiny 2 (and how they were used in Destiny 1).

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `nodeIndex` | `integer(int32)` | no | The index into the DestinyTalentGridDefinition's "nodes" property where this node is located. Used to uniquely identify the node within the Talent Grid. Note that this is content version dependent: make sure you have the latest version of content before trying to use these properties. |
| `nodeHash` | `integer(uint32)` | no | The hash identifier for the node, which unfortunately is also content version dependent but can be (and ideally, should be) used instead of the nodeIndex to uniquely identify the node.<br>The two exist side-by-side for backcompat reasons due to the Great Talent Node Restructuring of Destiny 1, and I ran out of time to remove one of them and standardize on the other. Sorry! |
| `row` | `integer(int32)` | no | The visual "row" where the node should be shown in the UI. If negative, then the node is hidden. |
| `column` | `integer(int32)` | no | The visual "column" where the node should be shown in the UI. If negative, the node is hidden. |
| `prerequisiteNodeIndexes` | `integer(int32)[]` | no | Indexes into the DestinyTalentGridDefinition.nodes property for any nodes that must be activated before this one is allowed to be activated.<br>I would have liked to change this to hashes for Destiny 2, but we have run out of time. |
| `binaryPairNodeIndex` | `integer(int32)` | no | At one point, Talent Nodes supported the idea of "Binary Pairs": nodes that overlapped each other visually, and where activating one deactivated the other. They ended up not being used, mostly because Exclusive Sets are *almost* a superset of this concept, but the potential for it to be used still exists in theory.<br>If this is ever used, this will be the index into the DestinyTalentGridDefinition.nodes property for the node that is the binary pair match to this node. Activating one deactivates the other. |
| `autoUnlocks` | `boolean` | no | If true, this node will automatically unlock when the Talent Grid's level reaches the required level of the current step of this node. |
| `lastStepRepeats` | `boolean` | no | At one point, Nodes were going to be able to be activated multiple times, changing the current step and potentially piling on multiple effects from the previously activated steps. This property would indicate if the last step could be activated multiple times. <br>This is not currently used, but it isn't out of the question that this could end up being used again in a theoretical future. |
| `isRandom` | `boolean` | no | If this is true, the node's step is determined randomly rather than the first step being chosen. |
| `randomActivationRequirement` | `object` | no | At one point, you were going to be able to repurchase talent nodes that had random steps, to "re-roll" the current step of the node (and thus change the properties of your item). This was to be the activation requirement for performing that re-roll.<br>The system still exists to do this, as far as I know, so it may yet come back around! |
| `isRandomRepurchasable` | `boolean` | no | If this is true, the node can be "re-rolled" to acquire a different random current step. This is not used, but still exists for a theoretical future of talent grids. |
| `steps` | `Destiny.Definitions.DestinyNodeStepDefinition[]` | no | At this point, "steps" have been obfuscated into conceptual entities, aggregating the underlying notions of "properties" and "true steps".<br>If you need to know a step as it truly exists - such as when recreating Node logic when processing Vendor data - you'll have to use the "realSteps" property below. |
| `exclusiveWithNodeHashes` | `integer(uint32)[]` | no | The nodeHash values for nodes that are in an Exclusive Set with this node.<br>See DestinyTalentGridDefinition.exclusiveSets for more info about exclusive sets.<br>Again, note that these are nodeHashes and *not* nodeIndexes. |
| `randomStartProgressionBarAtProgression` | `integer(int32)` | no | If the node's step is randomly selected, this is the amount of the Talent Grid's progression experience at which the progression bar for the node should be shown. |
| `layoutIdentifier` | `string` | no | A string identifier for a custom visual layout to apply to this talent node. Unfortunately, we do not have any data for rendering these custom layouts. It will be up to you to interpret these strings and change your UI if you want to have custom UI matching these layouts. |
| `groupHash` | `integer(uint32)` | no | As of Destiny 2, nodes can exist as part of "Exclusive Groups". These differ from exclusive sets in that, within the group, many nodes can be activated. But the act of activating any node in the group will cause "opposing" nodes (nodes in groups that are not allowed to be activated at the same time as this group) to deactivate.<br>See DestinyTalentExclusiveGroup for more information on the details. This is an identifier for this node's group, if it is part of one. |
| `loreHash` | `integer(uint32)` | no | Talent nodes can be associated with a piece of Lore, generally rendered in a tooltip. This is the hash identifier of the lore element to show, if there is one to be show. |
| `nodeStyleIdentifier` | `string` | no | Comes from the talent grid node style: this identifier should be used to determine how to render the node in the UI. |
| `ignoreForCompletion` | `boolean` | no | Comes from the talent grid node style: if true, then this node should be ignored for determining whether the grid is complete. |

### Destiny.Definitions.DestinyTalentNodeExclusiveSetDefinition

The list of indexes into the Talent Grid's "nodes" property for nodes in this exclusive set. (See DestinyTalentNodeDefinition.nodeIndex)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `nodeIndexes` | `integer(int32)[]` | no | The list of node indexes for the exclusive set. Historically, these were indexes. I would have liked to replace this with nodeHashes for consistency, but it's way too late for that. (9:09 PM, he's right!) |

### Destiny.Definitions.DestinyTalentNodeStepDamageTypes

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `15`

### Destiny.Definitions.DestinyTalentNodeStepGroups

These properties are an attempt to categorize talent node steps by certain common properties. See the related enumerations for the type of properties being categorized.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `weaponPerformance` | `integer(int32)` | no |  |
| `impactEffects` | `integer(int32)` | no |  |
| `guardianAttributes` | `integer(int32)` | no |  |
| `lightAbilities` | `integer(int32)` | no |  |
| `damageTypes` | `integer(int32)` | no |  |

### Destiny.Definitions.DestinyTalentNodeStepGuardianAttributes

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`
- `128`
- `255`

### Destiny.Definitions.DestinyTalentNodeStepImpactEffects

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `63`

### Destiny.Definitions.DestinyTalentNodeStepLightAbilities

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `63`

### Destiny.Definitions.DestinyTalentNodeStepWeaponPerformances

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`
- `128`
- `256`
- `512`
- `1024`
- `2048`
- `4096`
- `8191`

### Destiny.Definitions.DestinyUnlockDefinition

Unlock Flags are small bits (literally, a bit, as in a boolean value) that the game server uses for an extremely wide range of state checks, progress storage, and other interesting tidbits of information.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | Sometimes, but not frequently, these unlock flags also have human readable information: usually when they are being directly tested for some requirement, in which case the string is a localized description of why the requirement check failed. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyUnlockValueDefinition

An Unlock Value is an internal integer value, stored on the server and used in a variety of ways, most frequently for the gating/requirement checks that the game performs across all of its main features. They can also be used as the storage data for mapped Progressions, Objectives, and other features that require storage of variable numeric values.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyVendorAcceptedItemDefinition

If you ever wondered how the Vault works, here it is.
The Vault is merely a set of inventory buckets that exist on your Profile/Account level. When you transfer items in the Vault, the game is using the Vault Vendor's DestinyVendorAcceptedItemDefinitions to see where the appropriate destination bucket is for the source bucket from whence your item is moving. If it finds such an entry, it transfers the item to the other bucket.
The mechanics for Postmaster works similarly, which is also a vendor. All driven by Accepted Items.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `acceptedInventoryBucketHash` | `integer(uint32)` | no | The "source" bucket for a transfer. When a user wants to transfer an item, the appropriate DestinyVendorDefinition's acceptedItems property is evaluated, looking for an entry where acceptedInventoryBucketHash matches the bucket that the item being transferred is currently located. If it exists, the item will be transferred into whatever bucket is defined by destinationInventoryBucketHash. |
| `destinationInventoryBucketHash` | `integer(uint32)` | no | This is the bucket where the item being transferred will be put, given that it was being transferred *from* the bucket defined in acceptedInventoryBucketHash. |

### Destiny.Definitions.DestinyVendorActionDefinition

If a vendor can ever end up performing actions, these are the properties that will be related to those actions. I'm not going to bother documenting this yet, as it is unused and unclear if it will ever be used... but in case it is ever populated and someone finds it useful, it is defined here.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | no |  |
| `executeSeconds` | `integer(int32)` | no |  |
| `icon` | `string` | no |  |
| `name` | `string` | no |  |
| `verb` | `string` | no |  |
| `isPositive` | `boolean` | no |  |
| `actionId` | `string` | no |  |
| `actionHash` | `integer(uint32)` | no |  |
| `autoPerformAction` | `boolean` | no |  |

### Destiny.Definitions.DestinyVendorCategoryEntryDefinition

This is the definition for a single Vendor Category, into which Sale Items are grouped.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `categoryIndex` | `integer(int32)` | no | The index of the category in the original category definitions for the vendor. |
| `sortValue` | `integer(int32)` | no | Used in sorting items in vendors... but there's a lot more to it. Just go with the order provided in the itemIndexes property on the DestinyVendorCategoryComponent instead, it should be more reliable than trying to recalculate it yourself. |
| `categoryHash` | `integer(uint32)` | no | The hashed identifier for the category. |
| `quantityAvailable` | `integer(int32)` | no | The amount of items that will be available when this category is shown. |
| `showUnavailableItems` | `boolean` | no | If items aren't up for sale in this category, should we still show them (greyed out)? |
| `hideIfNoCurrency` | `boolean` | no | If you don't have the currency required to buy items from this category, should the items be hidden? |
| `hideFromRegularPurchase` | `boolean` | no | True if this category doesn't allow purchases. |
| `buyStringOverride` | `string` | no | The localized string for making purchases from this category, if it is different from the vendor's string for purchasing. |
| `disabledDescription` | `string` | no | If the category is disabled, this is the localized description to show. |
| `displayTitle` | `string` | no | The localized title of the category. |
| `overlay` | `object` | no | If this category has an overlay prompt that should appear, this contains the details of that prompt. |
| `vendorItemIndexes` | `integer(int32)[]` | no | A shortcut for the vendor item indexes sold under this category. Saves us from some expensive reorganization at runtime. |
| `isPreview` | `boolean` | no | Sometimes a category isn't actually used to sell items, but rather to preview them. This implies different UI (and manual placement of the category in the UI) in the game, and special treatment. |
| `isDisplayOnly` | `boolean` | no | If true, this category only displays items: you can't purchase anything in them. |
| `resetIntervalMinutesOverride` | `integer(int32)` | no |  |
| `resetOffsetMinutesOverride` | `integer(int32)` | no |  |

### Destiny.Definitions.DestinyVendorCategoryOverlayDefinition

The details of an overlay prompt to show to a user. They are all fairly self-explanatory localized strings that can be shown.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `choiceDescription` | `string` | no |  |
| `description` | `string` | no |  |
| `icon` | `string` | no |  |
| `title` | `string` | no |  |
| `currencyItemHash` | `integer(uint32)` | no | If this overlay has a currency item that it features, this is said featured item. |

### Destiny.Definitions.DestinyVendorDefinition

These are the definitions for Vendors.
In Destiny, a Vendor can be a lot of things - some things that you wouldn't expect, and some things that you don't even see directly in the game. Vendors are the Dolly Levi of the Destiny universe.
- Traditional Vendors as you see in game: people who you come up to and who give you quests, rewards, or who you can buy things from.
- Kiosks/Collections, which are really just Vendors that don't charge currency (or charge some pittance of a currency) and whose gating for purchases revolves more around your character's state.
- Previews for rewards or the contents of sacks. These are implemented as Vendors, where you can't actually purchase from them but the items that they have for sale and the categories of sale items reflect the rewards or contents of the sack. This is so that the game could reuse the existing Vendor display UI for rewards and save a bunch of wheel reinvention.
- Item Transfer capabilities, like the Vault and Postmaster. Vendors can have "acceptedItem" buckets that determine the source and destination buckets for transfers. When you interact with such a vendor, these buckets are what gets shown in the UI instead of any items that the Vendor would have for sale. Yep, the Vault is a vendor.
It is pretty much guaranteed that they'll be used for even more features in the future. They have come to be seen more as generic categorized containers for items than "vendors" in a traditional sense, for better or worse.
Where possible and time allows, we'll attempt to split those out into their own more digestible derived "Definitions": but often time does not allow that, as you can see from the above ways that vendors are used which we never split off from Vendor Definitions externally.
Since Vendors are so many things to so many parts of the game, the definition is understandably complex. You will want to combine this data with live Vendor information from the API when it is available.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.DestinyVendorDisplayPropertiesDefinition` | no |  |
| `vendorProgressionType` | `integer(int32)` | no | The type of reward progression that this vendor has. Default - The original rank progression from token redemption. Ritual - Progression from ranks in ritual content. For example: Crucible (Shaxx), Gambit (Drifter), and Battlegrounds (War Table). |
| `buyString` | `string` | no | If the vendor has a custom localized string describing the "buy" action, that is returned here. |
| `sellString` | `string` | no | Ditto for selling. Not that you can sell items to a vendor anymore. Will it come back? Who knows. The string's still there. |
| `displayItemHash` | `integer(uint32)` | no | If the vendor has an item that should be displayed as the "featured" item, this is the hash identifier for that DestinyVendorItemDefinition.<br>Apparently this is usually a related currency, like a reputation token. But it need not be restricted to that. |
| `inhibitBuying` | `boolean` | no | If this is true, you aren't allowed to buy whatever the vendor is selling. |
| `inhibitSelling` | `boolean` | no | If this is true, you're not allowed to sell whatever the vendor is buying. |
| `factionHash` | `integer(uint32)` | no | If the Vendor has a faction, this hash will be valid and point to a DestinyFactionDefinition.<br>The game UI and BNet often mine the faction definition for additional elements and details to place on the screen, such as the faction's Progression status (aka "Reputation"). |
| `resetIntervalMinutes` | `integer(int32)` | no | A number used for calculating the frequency of a vendor's inventory resetting/refreshing.<br>Don't worry about calculating this - we do it on the server side and send you the next refresh date with the live data. |
| `resetOffsetMinutes` | `integer(int32)` | no | Again, used for reset/refreshing of inventory. Don't worry too much about it. Unless you want to. |
| `failureStrings` | `string[]` | no | If an item can't be purchased from the vendor, there may be many "custom"/game state specific reasons why not.<br>This is a list of localized strings with messages for those custom failures. The live BNet data will return a failureIndexes property for items that can't be purchased: using those values to index into this array, you can show the user the appropriate failure message for the item that can't be bought. |
| `unlockRanges` | `Dates.DateRange[]` | no | If we were able to predict the dates when this Vendor will be visible/available, this will be the list of those date ranges. Sadly, we're not able to predict this very frequently, so this will often be useless data. |
| `vendorIdentifier` | `string` | no | The internal identifier for the Vendor. A holdover from the old days of Vendors, but we don't have time to refactor it away. |
| `vendorPortrait` | `string` | no | A portrait of the Vendor's smiling mug. Or frothing tentacles. |
| `vendorBanner` | `string` | no | If the vendor has a custom banner image, that can be found here. |
| `enabled` | `boolean` | no | If a vendor is not enabled, we won't even save the vendor's definition, and we won't return any items or info about them. It's as if they don't exist. |
| `visible` | `boolean` | no | If a vendor is not visible, we still have and will give vendor definition info, but we won't use them for things like Advisors or UI. |
| `vendorSubcategoryIdentifier` | `string` | no | The identifier of the VendorCategoryDefinition for this vendor's subcategory. |
| `consolidateCategories` | `boolean` | no | If TRUE, consolidate categories that only differ by trivial properties (such as having minor differences in name) |
| `actions` | `Destiny.Definitions.DestinyVendorActionDefinition[]` | no | Describes "actions" that can be performed on a vendor. Currently, none of these exist. But theoretically a Vendor could let you interact with it by performing actions. We'll see what these end up looking like if they ever get used. |
| `categories` | `Destiny.Definitions.DestinyVendorCategoryEntryDefinition[]` | no | These are the headers for sections of items that the vendor is selling. When you see items organized by category in the header, it is these categories that it is showing.<br>Well, technically not *exactly* these. On BNet, it doesn't make sense to have categories be "paged" as we do in Destiny, so we run some heuristics to attempt to aggregate pages of categories together. <br>These are the categories post-concatenation, if the vendor had concatenation applied. If you want the pre-aggregated category data, use originalCategories. |
| `originalCategories` | `Destiny.Definitions.DestinyVendorCategoryEntryDefinition[]` | no | See the categories property for a description of categories and why originalCategories exists. |
| `displayCategories` | `Destiny.Definitions.DestinyDisplayCategoryDefinition[]` | no | Display Categories are different from "categories" in that these are specifically for visual grouping and display of categories in Vendor UI. <br>The "categories" structure is for validation of the contained items, and can be categorized entirely separately from "Display Categories", there need be and often will be no meaningful relationship between the two. |
| `interactions` | `Destiny.Definitions.DestinyVendorInteractionDefinition[]` | no | In addition to selling items, vendors can have "interactions": UI where you "talk" with the vendor and they offer you a reward, some item, or merely acknowledge via dialog that you did something cool. |
| `inventoryFlyouts` | `Destiny.Definitions.DestinyVendorInventoryFlyoutDefinition[]` | no | If the vendor shows you items from your own inventory - such as the Vault vendor does - this data describes the UI around showing those inventory buckets and which ones get shown. |
| `itemList` | `Destiny.Definitions.DestinyVendorItemDefinition[]` | no | If the vendor sells items (or merely has a list of items to show like the "Sack" vendors do), this is the list of those items that the vendor can sell. From this list, only a subset will be available from the vendor at any given time, selected randomly and reset on the vendor's refresh interval.<br>Note that a vendor can sell the same item multiple ways: for instance, nothing stops a vendor from selling you some specific weapon but using two different currencies, or the same weapon at multiple "item levels". |
| `services` | `Destiny.Definitions.DestinyVendorServiceDefinition[]` | no | BNet doesn't use this data yet, but it appears to be an optional list of flavor text about services that the Vendor can provide. |
| `acceptedItems` | `Destiny.Definitions.DestinyVendorAcceptedItemDefinition[]` | no | If the Vendor is actually a vehicle for the transferring of items (like the Vault and Postmaster vendors), this defines the list of source->destination buckets for transferring. |
| `returnWithVendorRequest` | `boolean` | no | As many of you know, Vendor data has historically been pretty brutal on the BNet servers. In an effort to reduce this workload, only Vendors with this flag set will be returned on Vendor requests. This allows us to filter out Vendors that don't dynamic data that's particularly useful: things like "Preview/Sack" vendors, for example, that you can usually suss out the details for using just the definitions themselves. |
| `locations` | `Destiny.Definitions.Vendors.DestinyVendorLocationDefinition[]` | no | A vendor can be at different places in the world depending on the game/character/account state. This is the list of possible locations for the vendor, along with conditions we use to determine which one is currently active. |
| `groups` | `Destiny.Definitions.DestinyVendorGroupReference[]` | no | A vendor can be a part of 0 or 1 "groups" at a time: a group being a collection of Vendors related by either location or function/purpose. It's used for our our Companion Vendor UI. Only one of these can be active for a Vendor at a time. |
| `ignoreSaleItemHashes` | `integer(uint32)[]` | no | Some items don't make sense to return in the API, for example because they represent an action to be performed rather than an item being sold. I'd rather we not do this, but at least in the short term this is a workable workaround. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyVendorDisplayPropertiesDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `largeIcon` | `string` | no | I regret calling this a "large icon". It's more like a medium-sized image with a picture of the vendor's mug on it, trying their best to look cool. Not what one would call an icon. |
| `subtitle` | `string` | no |  |
| `originalIcon` | `string` | no | If we replaced the icon with something more glitzy, this is the original icon that the vendor had according to the game's content. It may be more lame and/or have less razzle-dazzle. But who am I to tell you which icon to use. |
| `requirementsDisplay` | `Destiny.Definitions.DestinyVendorRequirementDisplayEntryDefinition[]` | no | Vendors, in addition to expected display property data, may also show some "common requirements" as statically defined definition data. This might be when a vendor accepts a single type of currency, or when the currency is unique to the vendor and the designers wanted to show that currency when you interact with the vendor. |
| `smallTransparentIcon` | `string` | no | This is the icon used in parts of the game UI such as the vendor's waypoint. |
| `mapIcon` | `string` | no | This is the icon used in the map overview, when the vendor is located on the map. |
| `largeTransparentIcon` | `string` | no | This is apparently the "Watermark". I am not certain offhand where this is actually used in the Game UI, but some people may find it useful. |
| `description` | `string` | no |  |
| `name` | `string` | no |  |
| `icon` | `string` | no | Note that "icon" is sometimes misleading, and should be interpreted in the context of the entity. For instance, in Destiny 1 the DestinyRecordBookDefinition's icon was a big picture of a book.<br>But usually, it will be a small square image that you can use as... well, an icon.<br>They are currently represented as 96px x 96px images. |
| `iconHash` | `integer(uint32)` | no |  |
| `iconSequences` | `Destiny.Definitions.Common.DestinyIconSequenceDefinition[]` | no |  |
| `highResIcon` | `string` | no | If this item has a high-res icon (at least for now, many things won't), then the path to that icon will be here. |
| `hasIcon` | `boolean` | no |  |

### Destiny.Definitions.DestinyVendorGroupDefinition

BNet attempts to group vendors into similar collections. These groups aren't technically game canonical, but they are helpful for filtering vendors or showing them organized into a clean view on a webpage or app.
These definitions represent the groups we've built. Unlike in Destiny 1, a Vendors' group may change dynamically as the game state changes: thus, you will want to check DestinyVendorComponent responses to find a vendor's currently active Group (if you care).
Using this will let you group your vendors in your UI in a similar manner to how we will do grouping in the Companion.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `order` | `integer(int32)` | no | The recommended order in which to render the groups, Ascending order. |
| `categoryName` | `string` | no | For now, a group just has a name. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.DestinyVendorGroupReference

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorGroupHash` | `integer(uint32)` | no | The DestinyVendorGroupDefinition to which this Vendor can belong. |

### Destiny.Definitions.DestinyVendorInteractionDefinition

A Vendor Interaction is a dialog shown by the vendor other than sale items or transfer screens. The vendor is showing you something, and asking you to reply to it by choosing an option or reward.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `interactionIndex` | `integer(int32)` | no | The position of this interaction in its parent array. Note that this is NOT content agnostic, and should not be used as such. |
| `replies` | `Destiny.Definitions.DestinyVendorInteractionReplyDefinition[]` | no | The potential replies that the user can make to the interaction. |
| `vendorCategoryIndex` | `integer(int32)` | no | If >= 0, this is the category of sale items to show along with this interaction dialog. |
| `questlineItemHash` | `integer(uint32)` | no | If this interaction dialog is about a quest, this is the questline related to the interaction. You can use this to show the quest overview, or even the character's status with the quest if you use it to find the character's current Quest Step by checking their inventory against this questlineItemHash's DestinyInventoryItemDefinition.setData. |
| `sackInteractionList` | `Destiny.Definitions.DestinyVendorInteractionSackEntryDefinition[]` | no | If this interaction is meant to show you sacks, this is the list of types of sacks to be shown. If empty, the interaction is not meant to show sacks. |
| `uiInteractionType` | `integer(uint32)` | no | A UI hint for the behavior of the interaction screen. This is useful to determine what type of interaction is occurring, such as a prompt to receive a rank up reward or a prompt to choose a reward for completing a quest. The hash isn't as useful as the Enum in retrospect, well what can you do. Try using interactionType instead. |
| `interactionType` | `integer(int32)` | no | The enumerated version of the possible UI hints for vendor interactions, which is a little easier to grok than the hash found in uiInteractionType. |
| `rewardBlockLabel` | `string` | no | If this interaction is displaying rewards, this is the text to use for the header of the reward-displaying section of the interaction. |
| `rewardVendorCategoryIndex` | `integer(int32)` | no | If the vendor's reward list is sourced from one of his categories, this is the index into the category array of items to show. |
| `flavorLineOne` | `string` | no | If the vendor interaction has flavor text, this is some of it. |
| `flavorLineTwo` | `string` | no | If the vendor interaction has flavor text, this is the rest of it. |
| `headerDisplayProperties` | `object` | no | The header for the interaction dialog. |
| `instructions` | `string` | no | The localized text telling the player what to do when they see this dialog. |

### Destiny.Definitions.DestinyVendorInteractionReplyDefinition

When the interaction is replied to, Reward sites will fire and items potentially selected based on whether the given unlock expression is TRUE.
You can potentially choose one from multiple replies when replying to an interaction: this is how you get either/or rewards from vendors.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemRewardsSelection` | `integer(int32)` | no | The rewards granted upon responding to the vendor. |
| `reply` | `string` | no | The localized text for the reply. |
| `replyType` | `integer(int32)` | no | An enum indicating the type of reply being made. |

### Destiny.Definitions.DestinyVendorInteractionSackEntryDefinition

Compare this sackType to the sack identifier in the DestinyInventoryItemDefinition.vendorSackType property of items. If they match, show this sack with this interaction.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `sackType` | `integer(uint32)` | no |  |

### Destiny.Definitions.DestinyVendorInventoryFlyoutBucketDefinition

Information about a single inventory bucket in a vendor flyout UI and how it is shown.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `collapsible` | `boolean` | no | If true, the inventory bucket should be able to be collapsed visually. |
| `inventoryBucketHash` | `integer(uint32)` | no | The inventory bucket whose contents should be shown. |
| `sortItemsBy` | `integer(int32)` | no | The methodology to use for sorting items from the flyout. |

### Destiny.Definitions.DestinyVendorInventoryFlyoutDefinition

The definition for an "inventory flyout": a UI screen where we show you part of an otherwise hidden vendor inventory: like the Vault inventory buckets.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `lockedDescription` | `string` | no | If the flyout is locked, this is the reason why. |
| `displayProperties` | `object` | no | The title and other common properties of the flyout. |
| `buckets` | `Destiny.Definitions.DestinyVendorInventoryFlyoutBucketDefinition[]` | no | A list of inventory buckets and other metadata to show on the screen. |
| `flyoutId` | `integer(uint32)` | no | An identifier for the flyout, in case anything else needs to refer to them. |
| `suppressNewness` | `boolean` | no | If this is true, don't show any of the glistening "this is a new item" UI elements, like we show on the inventory items themselves in in-game UI. |
| `equipmentSlotHash` | `integer(uint32)` | no | If this flyout is meant to show you the contents of the player's equipment slot, this is the slot to show. |

### Destiny.Definitions.DestinyVendorItemDefinition

This represents an item being sold by the vendor.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorItemIndex` | `integer(int32)` | no | The index into the DestinyVendorDefinition.saleList. This is what we use to refer to items being sold throughout live and definition data. |
| `itemHash` | `integer(uint32)` | no | The hash identifier of the item being sold (DestinyInventoryItemDefinition).<br>Note that a vendor can sell the same item in multiple ways, so don't assume that itemHash is a unique identifier for this entity. |
| `quantity` | `integer(int32)` | no | The amount you will recieve of the item described in itemHash if you make the purchase. |
| `failureIndexes` | `integer(int32)[]` | no | An list of indexes into the DestinyVendorDefinition.failureStrings array, indicating the possible failure strings that can be relevant for this item. |
| `currencies` | `Destiny.Definitions.DestinyVendorItemQuantity[]` | no | This is a pre-compiled aggregation of item value and priceOverrideList, so that we have one place to check for what the purchaser must pay for the item. Use this instead of trying to piece together the price separately.<br>The somewhat crappy part about this is that, now that item quantity overrides have dynamic modifiers, this will not necessarily be statically true. If you were using this instead of live data, switch to using live data. |
| `refundPolicy` | `integer(int32)` | no | If this item can be refunded, this is the policy for what will be refundd, how, and in what time period. |
| `refundTimeLimit` | `integer(int32)` | no | The amount of time before refundability of the newly purchased item will expire. |
| `creationLevels` | `Destiny.Definitions.DestinyItemCreationEntryLevelDefinition[]` | no | The Default level at which the item will spawn. Almost always driven by an adjusto these days. Ideally should be singular. It's a long story how this ended up as a list, but there is always either going to be 0:1 of these entities. |
| `displayCategoryIndex` | `integer(int32)` | no | This is an index specifically into the display category, as opposed to the server-side Categories (which do not need to match or pair with each other in any way: server side categories are really just structures for common validation. Display Category will let us more easily categorize items visually) |
| `categoryIndex` | `integer(int32)` | no | The index into the DestinyVendorDefinition.categories array, so you can find the category associated with this item. |
| `originalCategoryIndex` | `integer(int32)` | no | Same as above, but for the original category indexes. |
| `minimumLevel` | `integer(int32)` | no | The minimum character level at which this item is available for sale. |
| `maximumLevel` | `integer(int32)` | no | The maximum character level at which this item is available for sale. |
| `action` | `object` | no | The action to be performed when purchasing the item, if it's not just "buy". |
| `displayCategory` | `string` | no | The string identifier for the category selling this item. |
| `inventoryBucketHash` | `integer(uint32)` | no | The inventory bucket into which this item will be placed upon purchase. |
| `visibilityScope` | `integer(int32)` | no | The most restrictive scope that determines whether the item is available in the Vendor's inventory. See DestinyGatingScope's documentation for more information.<br>This can be determined by Unlock gating, or by whether or not the item has purchase level requirements (minimumLevel and maximumLevel properties). |
| `purchasableScope` | `integer(int32)` | no | Similar to visibilityScope, it represents the most restrictive scope that determines whether the item can be purchased. It will at least be as restrictive as visibilityScope, but could be more restrictive if the item has additional purchase requirements beyond whether it is merely visible or not.<br>See DestinyGatingScope's documentation for more information. |
| `exclusivity` | `integer(int32)` | no | If this item can only be purchased by a given platform, this indicates the platform to which it is restricted. |
| `isOffer` | `boolean` | no | If this sale can only be performed as the result of an offer check, this is true. |
| `isCrm` | `boolean` | no | If this sale can only be performed as the result of receiving a CRM offer, this is true. |
| `sortValue` | `integer(int32)` | no | *if* the category this item is in supports non-default sorting, this value should represent the sorting value to use, pre-processed and ready to go. |
| `expirationTooltip` | `string` | no | If this item can expire, this is the tooltip message to show with its expiration info. |
| `redirectToSaleIndexes` | `integer(int32)[]` | no | If this is populated, the purchase of this item should redirect to purchasing these other items instead. |
| `socketOverrides` | `Destiny.Definitions.DestinyVendorItemSocketOverride[]` | no |  |
| `unpurchasable` | `boolean` | no | If true, this item is some sort of dummy sale item that cannot actually be purchased. It may be a display only item, or some fluff left by a content designer for testing purposes, or something that got disabled because it was a terrible idea. You get the picture. We won't know *why* it can't be purchased, only that it can't be. Sorry.<br>This is also only whether it's unpurchasable as a static property according to game content. There are other reasons why an item may or may not be purchasable at runtime, so even if this isn't set to True you should trust the runtime value for this sale item over the static definition if this is unset. |

### Destiny.Definitions.DestinyVendorItemQuantity

In addition to item quantity information for vendor prices, this also has any optional information that may exist about how the item's quantity can be modified. (unfortunately not information that is able to be read outside of the BNet servers, but it's there)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemHash` | `integer(uint32)` | no | The hash identifier for the item in question. Use it to look up the item's DestinyInventoryItemDefinition. |
| `itemInstanceId` | `integer(int64)` | no | If this quantity is referring to a specific instance of an item, this will have the item's instance ID. Normally, this will be null. |
| `quantity` | `integer(int32)` | no | The amount of the item needed/available depending on the context of where DestinyItemQuantity is being used. |
| `hasConditionalVisibility` | `boolean` | no | Indicates that this item quantity may be conditionally shown or hidden, based on various sources of state. For example: server flags, account state, or character progress. |

### Destiny.Definitions.DestinyVendorItemSocketOverride

The information for how the vendor purchase should override a given socket with custom plug data.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `singleItemHash` | `integer(uint32)` | no | If this is populated, the socket will be overridden with a specific plug.<br>If this isn't populated, it's being overridden by something more complicated that is only known by the Game Server and God, which means we can't tell you in advance what it'll be. |
| `randomizedOptionsCount` | `integer(int32)` | no | If this is greater than -1, the number of randomized plugs on this socket will be set to this quantity instead of whatever it's set to by default. |
| `socketTypeHash` | `integer(uint32)` | no | This appears to be used to select which socket ultimately gets the override defined here. |

### Destiny.Definitions.DestinyVendorRequirementDisplayEntryDefinition

The localized properties of the requirementsDisplay, allowing information about the requirement or item being featured to be seen.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `icon` | `string` | no |  |
| `name` | `string` | no |  |
| `source` | `string` | no |  |
| `type` | `string` | no |  |

### Destiny.Definitions.DestinyVendorSaleItemActionBlockDefinition

Not terribly useful, some basic cooldown interaction info.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `executeSeconds` | `number(float)` | no |  |
| `isPositive` | `boolean` | no |  |

### Destiny.Definitions.DestinyVendorServiceDefinition

When a vendor provides services, this is the localized name of those services.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no | The localized name of a service provided. |

### Destiny.Definitions.Director.DestinyActivityGraphArtElementDefinition

These Art Elements are meant to represent one-off visual effects overlaid on the map. Currently, we do not have a pipeline to import the assets for these overlays, so this info exists as a placeholder for when such a pipeline exists (if it ever will)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `position` | `object` | no | The position on the map of the art element. |

### Destiny.Definitions.Director.DestinyActivityGraphConnectionDefinition

Nodes on a graph can be visually connected: this appears to be the information about which nodes to link. It appears to lack more detailed information, such as the path for that linking.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `sourceNodeHash` | `integer(uint32)` | no |  |
| `destNodeHash` | `integer(uint32)` | no |  |

### Destiny.Definitions.Director.DestinyActivityGraphDefinition

Represents a Map View in the director: be them overview views, destination views, or other.
They have nodes which map to activities, and other various visual elements that we (or others) may or may not be able to use.
Activity graphs, most importantly, have nodes which can have activities in various states of playability.
Unfortunately, activity graphs are combined at runtime with Game UI-only assets such as fragments of map images, various in-game special effects, decals etc... that we don't get in these definitions.
If we end up having time, we may end up trying to manually populate those here: but the last time we tried that, before the lead-up to D1, it proved to be unmaintainable as the game's content changed. So don't bet the farm on us providing that content in this definition.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `nodes` | `Destiny.Definitions.Director.DestinyActivityGraphNodeDefinition[]` | no | These represent the visual "nodes" on the map's view. These are the activities you can click on in the map. |
| `artElements` | `Destiny.Definitions.Director.DestinyActivityGraphArtElementDefinition[]` | no | Represents one-off/special UI elements that appear on the map. |
| `connections` | `Destiny.Definitions.Director.DestinyActivityGraphConnectionDefinition[]` | no | Represents connections between graph nodes. However, it lacks context that we'd need to make good use of it. |
| `displayObjectives` | `Destiny.Definitions.Director.DestinyActivityGraphDisplayObjectiveDefinition[]` | no | Objectives can display on maps, and this is supposedly metadata for that. I have not had the time to analyze the details of what is useful within however: we could be missing important data to make this work. Expect this property to be expanded on later if possible. |
| `displayProgressions` | `Destiny.Definitions.Director.DestinyActivityGraphDisplayProgressionDefinition[]` | no | Progressions can also display on maps, but similarly to displayObjectives we appear to lack some required information and context right now. We will have to look into it later and add more data if possible. |
| `linkedGraphs` | `Destiny.Definitions.Director.DestinyLinkedGraphDefinition[]` | no | Represents links between this Activity Graph and other ones. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Director.DestinyActivityGraphDisplayObjectiveDefinition

When a Graph needs to show active Objectives, this defines those objectives as well as an identifier.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer(uint32)` | no | $NOTE $amola 2017-01-19 This field is apparently something that CUI uses to manually wire up objectives to display info. I am unsure how it works. |
| `objectiveHash` | `integer(uint32)` | no | The objective being shown on the map. |

### Destiny.Definitions.Director.DestinyActivityGraphDisplayProgressionDefinition

When a Graph needs to show active Progressions, this defines those objectives as well as an identifier.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `integer(uint32)` | no |  |
| `progressionHash` | `integer(uint32)` | no |  |

### Destiny.Definitions.Director.DestinyActivityGraphNodeActivityDefinition

The actual activity to be redirected to when you click on the node. Note that a node can have many Activities attached to it: but only one will be active at any given time. The list of Node Activities will be traversed, and the first one found to be active will be displayed. This way, a node can layer multiple variants of an activity on top of each other. For instance, one node can control the weekly Crucible Playlist. There are multiple possible playlists, but only one is active for the week.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `nodeActivityId` | `integer(uint32)` | no | An identifier for this node activity. It is only guaranteed to be unique within the Activity Graph. |
| `activityHash` | `integer(uint32)` | no | The activity that will be activated if the user clicks on this node. Controls all activity-related information displayed on the node if it is active (the text shown in the tooltip etc) |

### Destiny.Definitions.Director.DestinyActivityGraphNodeDefinition

This is the position and other data related to nodes in the activity graph that you can click to launch activities. An Activity Graph node will only have one active Activity at a time, which will determine the activity to be launched (and, unless overrideDisplay information is provided, will also determine the tooltip and other UI related to the node)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `nodeId` | `integer(uint32)` | no | An identifier for the Activity Graph Node, only guaranteed to be unique within its parent Activity Graph. |
| `overrideDisplay` | `object` | no | The node *may* have display properties that override the active Activity's display properties. |
| `position` | `object` | no | The position on the map for this node. |
| `featuringStates` | `Destiny.Definitions.Director.DestinyActivityGraphNodeFeaturingStateDefinition[]` | no | The node may have various visual accents placed on it, or styles applied. These are the list of possible styles that the Node can have. The game iterates through each, looking for the first one that passes a check of the required game/character/account state in order to show that style, and then renders the node in that style. |
| `activities` | `Destiny.Definitions.Director.DestinyActivityGraphNodeActivityDefinition[]` | no | The node may have various possible activities that could be active for it, however only one may be active at a time. See the DestinyActivityGraphNodeActivityDefinition for details. |
| `states` | `Destiny.Definitions.Director.DestinyActivityGraphNodeStateEntry[]` | no | Represents possible states that the graph node can be in. These are combined with some checking that happens in the game client and server to determine which state is actually active at any given time. |

### Destiny.Definitions.Director.DestinyActivityGraphNodeFeaturingStateDefinition

Nodes can have different visual states. This object represents a single visual state ("highlight type") that a node can be in, and the unlock expression condition to determine whether it should be set.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `highlightType` | `integer(int32)` | no | The node can be highlighted in a variety of ways - the game iterates through these and finds the first FeaturingState that is valid at the present moment given the Game, Account, and Character state, and renders the node in that state. See the ActivityGraphNodeHighlightType enum for possible values. |

### Destiny.Definitions.Director.DestinyActivityGraphNodeStateEntry

Represents a single state that a graph node might end up in. Depending on what's going on in the game, graph nodes could be shown in different ways or even excluded from view entirely.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `integer(int32)` | no |  |

### Destiny.Definitions.Director.DestinyLinkedGraphDefinition

This describes links between the current graph and others, as well as when that link is relevant.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | no |  |
| `name` | `string` | no |  |
| `linkedGraphId` | `integer(uint32)` | no |  |
| `linkedGraphs` | `Destiny.Definitions.Director.DestinyLinkedGraphEntryDefinition[]` | no |  |
| `overview` | `string` | no |  |

### Destiny.Definitions.Director.DestinyLinkedGraphEntryDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityGraphHash` | `integer(uint32)` | no |  |

### Destiny.Definitions.EnergyTypes.DestinyEnergyTypeDefinition

Represents types of Energy that can be used for costs and payments related to Armor 2.0 mods.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | The description of the energy type, icon etc... |
| `transparentIconPath` | `string` | no | A variant of the icon that is transparent and colorless. |
| `showIcon` | `boolean` | no | If TRUE, the game shows this Energy type's icon. Otherwise, it doesn't. Whether you show it or not is up to you. |
| `enumValue` | `integer(int32)` | no | We have an enumeration for Energy types for quick reference. This is the current definition's Energy type enum value. |
| `capacityStatHash` | `integer(uint32)` | no | If this Energy Type can be used for determining the Type of Energy that an item can consume, this is the hash for the DestinyInvestmentStatDefinition that represents the stat which holds the Capacity for that energy type. (Note that this is optional because "Any" is a valid cost, but not valid for Capacity - an Armor must have a specific Energy Type for determining the energy type that the Armor is restricted to use) |
| `costStatHash` | `integer(uint32)` | no | If this Energy Type can be used as a cost to pay for socketing Armor 2.0 items, this is the hash for the DestinyInvestmentStatDefinition that stores the plug's raw cost. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.FireteamFinder.DestinyActivityGraphReference

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityGraphHash` | `integer(uint32)` | no |  |

### Destiny.Definitions.FireteamFinder.DestinyActivityInteractableReference

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityInteractableHash` | `integer(uint32)` | no |  |
| `activityInteractableElementIndex` | `integer(int32)` | no |  |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderActivityGraphDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `color` | `Destiny.Misc.DestinyColor` | no |  |
| `isPlayerElectedDifficultyNode` | `boolean` | no |  |
| `parentHash` | `integer(uint32)` | no |  |
| `children` | `integer(uint32)[]` | no |  |
| `selfAndAllDescendantHashes` | `integer(uint32)[]` | no |  |
| `relatedActivitySetHashes` | `integer(uint32)[]` | no |  |
| `specificActivitySetHash` | `integer(uint32)` | no |  |
| `relatedActivityHashes` | `integer(uint32)[]` | no |  |
| `relatedDirectorNodes` | `Destiny.Definitions.FireteamFinder.DestinyActivityGraphReference[]` | no |  |
| `relatedInteractableActivities` | `Destiny.Definitions.FireteamFinder.DestinyActivityInteractableReference[]` | no |  |
| `relatedLocationHashes` | `integer(uint32)[]` | no |  |
| `sortMatchmadeActivitiesToFront` | `boolean` | no |  |
| `enabledOnTreeTypesListEnum` | `integer(int32)[]` | no |  |
| `activityTreeChildSortMode` | `integer(int32)` | no |  |
| `sortPriority` | `integer(int32)` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderActivitySetDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `maximumPartySize` | `integer(int32)` | no |  |
| `optionHashes` | `integer(uint32)[]` | no |  |
| `labelHashes` | `integer(uint32)[]` | no |  |
| `activityGraphHashes` | `integer(uint32)[]` | no |  |
| `activityHashes` | `integer(uint32)[]` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderConstantsDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `fireteamFinderActivityGraphRootCategoryHashes` | `integer(uint32)[]` | no |  |
| `allFireteamFinderActivityHashes` | `integer(uint32)[]` | no |  |
| `guardianOathDisplayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `guardianOathTenets` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition[]` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderLabelDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `descendingSortPriority` | `integer(int32)` | no |  |
| `groupHash` | `integer(uint32)` | no |  |
| `allowInFields` | `integer(int32)` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderLabelGroupDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `descendingSortPriority` | `integer(int32)` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionCreatorSettings

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `control` | `Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionSettingsControl` | no |  |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `descendingSortPriority` | `integer(int32)` | no |  |
| `groupHash` | `integer(uint32)` | no |  |
| `codeOptionType` | `integer(int32)` | no |  |
| `availability` | `integer(int32)` | no |  |
| `visibility` | `integer(int32)` | no |  |
| `uiDisplayStyle` | `string` | no |  |
| `creatorSettings` | `Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionCreatorSettings` | no |  |
| `searcherSettings` | `Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionSearcherSettings` | no |  |
| `values` | `Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionValues` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionGroupDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `descendingSortPriority` | `integer(int32)` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionSearcherSettings

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `control` | `Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionSettingsControl` | no |  |
| `searchFilterType` | `integer(int32)` | no |  |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionSettingsControl

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `integer(int32)` | no |  |
| `minSelectedItems` | `integer(int32)` | no |  |
| `maxSelectedItems` | `integer(int32)` | no |  |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionValueDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `value` | `integer(uint32)` | no |  |
| `flags` | `integer(int32)` | no |  |

### Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionValues

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `optionalNull` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `optionalFormatString` | `string` | no |  |
| `displayFormatType` | `integer(int32)` | no |  |
| `type` | `integer(int32)` | no |  |
| `valueDefinitions` | `Destiny.Definitions.FireteamFinder.DestinyFireteamFinderOptionValueDefinition[]` | no |  |

### Destiny.Definitions.GuardianRanks.DestinyGuardianRankConstantsDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `rankCount` | `integer(int32)` | no |  |
| `guardianRankHashes` | `integer(uint32)[]` | no |  |
| `rootNodeHash` | `integer(uint32)` | no |  |
| `iconBackgrounds` | `Destiny.Definitions.GuardianRanks.DestinyGuardianRankIconBackgroundsDefinition` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.GuardianRanks.DestinyGuardianRankDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `rankNumber` | `integer(int32)` | no |  |
| `presentationNodeHash` | `integer(uint32)` | no |  |
| `foregroundImagePath` | `string` | no |  |
| `overlayImagePath` | `string` | no |  |
| `overlayMaskImagePath` | `string` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.GuardianRanks.DestinyGuardianRankIconBackgroundsDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `backgroundEmptyBorderedImagePath` | `string` | no |  |
| `backgroundEmptyBlueGradientBorderedImagePath` | `string` | no |  |
| `backgroundFilledBlueBorderedImagePath` | `string` | no |  |
| `backgroundFilledBlueGradientBorderedImagePath` | `string` | no |  |
| `backgroundFilledBlueLowAlphaImagePath` | `string` | no |  |
| `backgroundFilledBlueMediumAlphaImagePath` | `string` | no |  |
| `backgroundFilledGrayMediumAlphaBorderedImagePath` | `string` | no |  |
| `backgroundFilledGrayHeavyAlphaBorderedImagePath` | `string` | no |  |
| `backgroundFilledWhiteMediumAlphaImagePath` | `string` | no |  |
| `backgroundFilledWhiteImagePath` | `string` | no |  |
| `backgroundPlateWhiteImagePath` | `string` | no |  |
| `backgroundPlateBlackImagePath` | `string` | no |  |
| `backgroundPlateBlackAlphaImagePath` | `string` | no |  |

### Destiny.Definitions.Inventory.DestinyIconDefinition

Lists of icons that can be used for a variety of purposes

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `foreground` | `string` | no |  |
| `background` | `string` | no |  |
| `secondaryBackground` | `string` | no |  |
| `specialBackground` | `string` | no |  |
| `highResForeground` | `string` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Inventory.DestinyItemFilterDefinition

Lists of items that can be used for a variety of purposes, including featuring them as new gear

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `allowedItems` | `integer(uint32)[]` | no | The items in this set |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Items.DestinyDerivedItemCategoryDefinition

A shortcut for the fact that some items have a "Preview Vendor" - See DestinyInventoryItemDefinition.preview.previewVendorHash - that is intended to be used to show what items you can get as a result of acquiring or using this item.
A common example of this in Destiny 1 was Eververse "Boxes," which could have many possible items. This "Preview Vendor" is not a vendor you can actually see in the game, but it defines categories and sale items for all of the possible items you could get from the Box so that the game can show them to you. We summarize that info here so that you don't have to do that Vendor lookup and aggregation manually.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `categoryDescription` | `string` | no | The localized string for the category title. This will be something describing the items you can get as a group, or your likelihood/the quantity you'll get. |
| `items` | `Destiny.Definitions.Items.DestinyDerivedItemDefinition[]` | no | This is the list of all of the items for this category and the basic properties we'll know about them. |

### Destiny.Definitions.Items.DestinyDerivedItemDefinition

This is a reference to, and summary data for, a specific item that you can get as a result of Using or Acquiring some other Item (For example, this could be summary information for an Emote that you can get by opening an an Eververse Box) See DestinyDerivedItemCategoryDefinition for more information.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemHash` | `integer(uint32)` | no | The hash for the DestinyInventoryItemDefinition of this derived item, if there is one. Sometimes we are given this information as a manual override, in which case there won't be an actual DestinyInventoryItemDefinition for what we display, but you can still show the strings from this object itself. |
| `itemName` | `string` | no | The name of the derived item. |
| `itemDetail` | `string` | no | Additional details about the derived item, in addition to the description. |
| `itemDescription` | `string` | no | A brief description of the item. |
| `iconPath` | `string` | no | An icon for the item. |
| `vendorItemIndex` | `integer(int32)` | no | If the item was derived from a "Preview Vendor", this will be an index into the DestinyVendorDefinition's itemList property. Otherwise, -1. |

### Destiny.Definitions.Items.DestinyEnergyCapacityEntry

Items can have Energy Capacity, and plugs can provide that capacity such as on a piece of Armor in Armor 2.0. This is how much "Energy" can be spent on activating plugs for this item.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `capacityValue` | `integer(int32)` | no | How much energy capacity this plug provides. |
| `energyTypeHash` | `integer(uint32)` | no | Energy provided by a plug is always of a specific type - this is the hash identifier for the energy type for which it provides Capacity. |
| `energyType` | `integer(int32)` | no | The Energy Type for this energy capacity, in enum form for easy use. |

### Destiny.Definitions.Items.DestinyEnergyCostEntry

Some plugs cost Energy, which is a stat on the item that can be increased by other plugs (that, at least in Armor 2.0, have a "masterworks-like" mechanic for upgrading). If a plug has costs, the details of that cost are defined here.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `energyCost` | `integer(int32)` | no | The Energy cost for inserting this plug. |
| `energyTypeHash` | `integer(uint32)` | no | The type of energy that this plug costs, as a reference to the DestinyEnergyTypeDefinition of the energy type. |
| `energyType` | `integer(int32)` | no | The type of energy that this plug costs, in enum form. |

### Destiny.Definitions.Items.DestinyEquipableItemSetDefinition

Perks that are active only when you have a certain number of set items equipped.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | Display Properties, including name and icon, for this item set |
| `setItems` | `integer(uint32)[]` | no | The items that confer these perks. |
| `setPerks` | `Destiny.Definitions.Items.DestinyItemSetPerkDefinition[]` | no | The perks conferred by this set of armor pieces. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Items.DestinyInventoryItemConstantsDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `gearTierOverlayImagePaths` | `string[]` | no | Gear tier overlay images |
| `watermarkDropShadowPath` | `string` | no | Watermark drop shadow |
| `craftedBackgroundPath` | `string` | no | Reverse drop shadow for crafted icon identifier |
| `featuredItemFlagPath` | `string` | no | Teal flag for featured item watermarks |
| `masterworkOverlayPath` | `string` | no | Gold masterwork glow for non-Exotic items |
| `masterworkExoticOverlayPath` | `string` | no | Gold masterwork glow for Exotic items |
| `masterworkBorderedOverlayPath` | `string` | no | Gold masterwork glow for non-Exotic Items, with a gold border |
| `masterworkExoticBorderedOverlayPath` | `string` | no | Gold masterwork glow for Exotic items, with a gold border |
| `craftedOverlayPath` | `string` | no | Crafted weapon overlay path |
| `enhancedItemOverlayPath` | `string` | no | Enhanced item overlay |
| `holofoilBackgroundOverlayPath` | `string` | no | Layer between item and color background to denote holofoil status, introduced in v736 |
| `holofoil900BackgroundOverlayPath` | `string` | no | Layer between item and color background to denote holofoil status, introduced in v900 |
| `holofoil900AnimatedBackgroundOverlayPath` | `string` | no | Layer between item and color background to denote holofoil status, introduced in v900, animated |
| `universalOrnamentBackgroundOverlayPath` | `string` | no | Layer between item and color background to denote universal ornament status |
| `universalOrnamentLegendaryBackgroundOverlayPath` | `string` | no | Layer between a legendary item and its color background to denote universal ornament status |
| `universalOrnamentExoticBackgroundOverlayPath` | `string` | no | Layer between an exotic item and its color background to denote universal ornament status |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Items.DestinyItemPlugDefinition

If an item is a Plug, its DestinyInventoryItemDefinition.plug property will be populated with an instance of one of these bad boys.
This gives information about when it can be inserted, what the plug's category is (and thus whether it is compatible with a socket... see DestinySocketTypeDefinition for information about Plug Categories and socket compatibility), whether it is enabled and other Plug info.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `insertionRules` | `Destiny.Definitions.Items.DestinyPlugRuleDefinition[]` | no | The rules around when this plug can be inserted into a socket, aside from the socket's individual restrictions.<br>The live data DestinyItemPlugComponent.insertFailIndexes will be an index into this array, so you can pull out the failure strings appropriate for the user. |
| `plugCategoryIdentifier` | `string` | no | The string identifier for the plug's category. Use the socket's DestinySocketTypeDefinition.plugWhitelist to determine whether this plug can be inserted into the socket. |
| `plugCategoryHash` | `integer(uint32)` | no | The hash for the plugCategoryIdentifier. You can use this instead if you wish: I put both in the definition for debugging purposes. |
| `onActionRecreateSelf` | `boolean` | no | If you successfully socket the item, this will determine whether or not you get "refunded" on the plug. |
| `insertionMaterialRequirementHash` | `integer(uint32)` | no | If inserting this plug requires materials, this is the hash identifier for looking up the DestinyMaterialRequirementSetDefinition for those requirements. |
| `previewItemOverrideHash` | `integer(uint32)` | no | In the game, if you're inspecting a plug item directly, this will be the item shown with the plug attached. Look up the DestinyInventoryItemDefinition for this hash for the item. |
| `enabledMaterialRequirementHash` | `integer(uint32)` | no | It's not enough for the plug to be inserted. It has to be enabled as well. For it to be enabled, it may require materials. This is the hash identifier for the DestinyMaterialRequirementSetDefinition for those requirements, if there is one. |
| `enabledRules` | `Destiny.Definitions.Items.DestinyPlugRuleDefinition[]` | no | The rules around whether the plug, once inserted, is enabled and providing its benefits.<br>The live data DestinyItemPlugComponent.enableFailIndexes will be an index into this array, so you can pull out the failure strings appropriate for the user. |
| `uiPlugLabel` | `string` | no | Plugs can have arbitrary, UI-defined identifiers that the UI designers use to determine the style applied to plugs. Unfortunately, we have neither a definitive list of these labels nor advance warning of when new labels might be applied or how that relates to how they get rendered. If you want to, you can refer to known labels to change your own styles: but know that new ones can be created arbitrarily, and we have no way of associating the labels with any specific UI style guidance... you'll have to piece that together on your end. Or do what we do, and just show plugs more generically, without specialized styles. |
| `plugStyle` | `integer(int32)` | no |  |
| `plugAvailability` | `integer(int32)` | no | Indicates the rules about when this plug can be used. See the PlugAvailabilityMode enumeration for more information! |
| `alternateUiPlugLabel` | `string` | no | If the plug meets certain state requirements, it may have an alternative label applied to it. This is the alternative label that will be applied in such a situation. |
| `alternatePlugStyle` | `integer(int32)` | no | The alternate plug of the plug: only applies when the item is in states that only the server can know about and control, unfortunately. See AlternateUiPlugLabel for the related label info. |
| `isDummyPlug` | `boolean` | no | If TRUE, this plug is used for UI display purposes only, and doesn't have any interesting effects of its own. |
| `parentItemOverride` | `object` | no | Do you ever get the feeling that a system has become so overburdened by edge cases that it probably should have become some other system entirely? So do I!<br>In totally unrelated news, Plugs can now override properties of their parent items. This is some of the relevant definition data for those overrides.<br>If this is populated, it will have the override data to be applied when this plug is applied to an item. |
| `energyCapacity` | `object` | no | IF not null, this plug provides Energy capacity to the item in which it is socketed. In Armor 2.0 for example, is implemented in a similar way to Masterworks, where visually it's a single area of the UI being clicked on to "Upgrade" to higher energy levels, but it's actually socketing new plugs. |
| `energyCost` | `object` | no | IF not null, this plug has an energy cost. This contains the details of that cost. |

### Destiny.Definitions.Items.DestinyItemSetPerkDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `requiredSetCount` | `integer(int32)` | no | The number of set pieces required to activate the perk. |
| `sandboxPerkHash` | `integer(uint32)` | no | The perk this set confers. |

### Destiny.Definitions.Items.DestinyItemTierTypeDefinition

Defines the tier type of an item. Mostly this provides human readable properties for types like Common, Rare, etc...
It also provides some base data for infusion that could be useful.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `infusionProcess` | `object` | no | If this tier defines infusion properties, they will be contained here. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Items.DestinyItemTierTypeInfusionBlock

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `baseQualityTransferRatio` | `number(float)` | no | The default portion of quality that will transfer from the infuser to the infusee item. (InfuserQuality - InfuseeQuality) * baseQualityTransferRatio = base quality transferred. |
| `minimumQualityIncrement` | `integer(int32)` | no | As long as InfuserQuality > InfuseeQuality, the amount of quality bestowed is guaranteed to be at least this value, even if the transferRatio would dictate that it should be less. The total amount of quality that ends up in the Infusee cannot exceed the Infuser's quality however (for instance, if you infuse a 300 item with a 301 item and the minimum quality increment is 10, the infused item will not end up with 310 quality) |

### Destiny.Definitions.Items.DestinyParentItemOverride

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `additionalEquipRequirementsDisplayStrings` | `string[]` | no |  |
| `pipIcon` | `string` | no |  |

### Destiny.Definitions.Items.DestinyPlugRuleDefinition

Dictates a rule around whether the plug is enabled or insertable.
In practice, the live Destiny data will refer to these entries by index. You can then look up that index in the appropriate property (enabledRules or insertionRules) to get the localized string for the failure message if it failed.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `failureMessage` | `string` | no | The localized string to show if this rule fails. |

### Destiny.Definitions.Loadouts.DestinyLoadoutColorDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `colorImagePath` | `string` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Loadouts.DestinyLoadoutConstantsDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `whiteIconImagePath` | `string` | no | This is the same icon as the one in the display properties, offered here as well with a more descriptive name. |
| `blackIconImagePath` | `string` | no | This is a color-inverted version of the whiteIconImagePath. |
| `loadoutCountPerCharacter` | `integer(int32)` | no | The maximum number of loadouts available to each character. The loadouts component API response can return fewer loadouts than this, as more loadouts are unlocked by reaching higher Guardian Ranks. |
| `loadoutPreviewFilterOutSocketCategoryHashes` | `integer(uint32)[]` | no | A list of the socket category hashes to be filtered out of loadout item preview displays. |
| `loadoutPreviewFilterOutSocketTypeHashes` | `integer(uint32)[]` | no | A list of the socket type hashes to be filtered out of loadout item preview displays. |
| `loadoutNameHashes` | `integer(uint32)[]` | no | A list of the loadout name hashes in index order, for convenience. |
| `loadoutIconHashes` | `integer(uint32)[]` | no | A list of the loadout icon hashes in index order, for convenience. |
| `loadoutColorHashes` | `integer(uint32)[]` | no | A list of the loadout color hashes in index order, for convenience. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Loadouts.DestinyLoadoutIconDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `iconImagePath` | `string` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Loadouts.DestinyLoadoutNameDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Lore.DestinyLoreDefinition

These are definitions for in-game "Lore," meant to be narrative enhancements of the game experience.
DestinyInventoryItemDefinitions for interesting items point to these definitions, but nothing's stopping you from scraping all of these and doing something cool with them. If they end up having cool data.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `subtitle` | `string` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Metrics.DestinyMetricDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `trackingObjectiveHash` | `integer(uint32)` | no |  |
| `lowerValueIsBetter` | `boolean` | no |  |
| `presentationNodeType` | `integer(int32)` | no |  |
| `traitIds` | `string[]` | no |  |
| `traitHashes` | `integer(uint32)[]` | no |  |
| `parentNodeHashes` | `integer(uint32)[]` | no | A quick reference to presentation nodes that have this node as a child. Presentation nodes can be parented under multiple parents. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Milestones.DestinyMilestoneActivityDefinition

Milestones can have associated activities which provide additional information about the context, challenges, modifiers, state etc... related to this Milestone. 
Information we need to be able to return that data is defined here, along with Tier data to establish a relationship between a conceptual Activity and its difficulty levels and variants.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `conceptualActivityHash` | `integer(uint32)` | no | The "Conceptual" activity hash. Basically, we picked the lowest level activity and are treating it as the canonical definition of the activity for rendering purposes.<br>If you care about the specific difficulty modes and variations, use the activities under "Variants". |
| `variants` | `object` | no | A milestone-referenced activity can have many variants, such as Tiers or alternative modes of play.<br>Even if there is only a single variant, the details for these are represented within as a variant definition.<br>It is assumed that, if this DestinyMilestoneActivityDefinition is active, then all variants should be active.<br>If a Milestone could ever split the variants' active status conditionally, they should all have their own DestinyMilestoneActivityDefinition instead! The potential duplication will be worth it for the obviousness of processing and use. |

### Destiny.Definitions.Milestones.DestinyMilestoneActivityVariantDefinition

Represents a variant on an activity for a Milestone: a specific difficulty tier, or a specific activity variant for example.
These will often have more specific details, such as an associated Guided Game, progression steps, tier-specific rewards, and custom values.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no | The hash to use for looking up the variant Activity's definition (DestinyActivityDefinition), where you can find its distinguishing characteristics such as difficulty level and recommended light level. <br>Frequently, that will be the only distinguishing characteristics in practice, which is somewhat of a bummer. |
| `order` | `integer(int32)` | no | If you care to do so, render the variants in the order prescribed by this value.<br>When you combine live Milestone data with the definition, the order becomes more useful because you'll be cross-referencing between the definition and live data. |

### Destiny.Definitions.Milestones.DestinyMilestoneChallengeActivityDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no | The activity for which this challenge is active. |
| `challenges` | `Destiny.Definitions.Milestones.DestinyMilestoneChallengeDefinition[]` | no |  |
| `activityGraphNodes` | `Destiny.Definitions.Milestones.DestinyMilestoneChallengeActivityGraphNodeEntry[]` | no | If the activity and its challenge is visible on any of these nodes, it will be returned. |
| `phases` | `Destiny.Definitions.Milestones.DestinyMilestoneChallengeActivityPhase[]` | no | Phases related to this activity, if there are any.<br>These will be listed in the order in which they will appear in the actual activity. |

### Destiny.Definitions.Milestones.DestinyMilestoneChallengeActivityGraphNodeEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityGraphHash` | `integer(uint32)` | no |  |
| `activityGraphNodeHash` | `integer(uint32)` | no |  |

### Destiny.Definitions.Milestones.DestinyMilestoneChallengeActivityPhase

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `phaseHash` | `integer(uint32)` | no | The hash identifier of the activity's phase. |

### Destiny.Definitions.Milestones.DestinyMilestoneChallengeDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `challengeObjectiveHash` | `integer(uint32)` | no | The challenge related to this milestone. |

### Destiny.Definitions.Milestones.DestinyMilestoneDefinition

Milestones are an in-game concept where they're attempting to tell you what you can do next in-game.
If that sounds a lot like Advisors in Destiny 1, it is! So we threw out Advisors in the Destiny 2 API and tacked all of the data we would have put on Advisors onto Milestones instead.
Each Milestone represents something going on in the game right now:
- A "ritual activity" you can perform, like nightfall
- A "special event" that may have activities related to it, like Taco Tuesday (there's no Taco Tuesday in Destiny 2)
- A checklist you can fulfill, like helping your Clan complete all of its weekly objectives
- A tutorial quest you can play through, like the introduction to the Crucible.
Most of these milestones appear in game as well. Some of them are BNet only, because we're so extra. You're welcome.
There are some important caveats to understand about how we currently render Milestones and their deficiencies. The game currently doesn't have any content that actually tells you oughtright *what* the Milestone is: that is to say, what you'll be doing. The best we get is either a description of the overall Milestone, or of the Quest that the Milestone is having you partake in: which is usually something that assumes you already know what it's talking about, like "Complete 5 Challenges". 5 Challenges for what? What's a challenge? These are not questions that the Milestone data will answer for you unfortunately.
This isn't great, and in the future I'd like to add some custom text to give you more contextual information to pass on to your users. But for now, you can do what we do to render what little display info we do have:
Start by looking at the currently active quest (ideally, you've fetched DestinyMilestone or DestinyPublicMilestone data from the API, so you know the currently active quest for the Milestone in question). Look up the Quests property in the Milestone Definition, and check if it has display properties. If it does, show that as the description of the Milestone. If it doesn't, fall back on the Milestone's description.
This approach will let you avoid, whenever possible, the even less useful (and sometimes nonexistant) milestone-level names and descriptions.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `displayPreference` | `integer(int32)` | no | A hint to the UI to indicate what to show as the display properties for this Milestone when showing "Live" milestone data. Feel free to show more than this if desired: this hint is meant to simplify our own UI, but it may prove useful to you as well. |
| `image` | `string` | no | A custom image someone made just for the milestone. Isn't that special? |
| `milestoneType` | `integer(int32)` | no | An enumeration listing one of the possible types of milestones. Check out the DestinyMilestoneType enum for more info! |
| `recruitable` | `boolean` | no | If True, then the Milestone has been integrated with BNet's recruiting feature. |
| `friendlyName` | `string` | no | If the milestone has a friendly identifier for association with other features - such as Recruiting - that identifier can be found here. This is "friendly" in that it looks better in a URL than whatever the identifier for the Milestone actually is. |
| `showInExplorer` | `boolean` | no | If TRUE, this entry should be returned in the list of milestones for the "Explore Destiny" (i.e. new BNet homepage) features of Bungie.net (as long as the underlying event is active) Note that this is a property specifically used by BNet and the companion app for the "Live Events" feature of the front page/welcome view: it's not a reflection of what you see in-game. |
| `showInMilestones` | `boolean` | no | Determines whether we'll show this Milestone in the user's personal Milestones list. |
| `explorePrioritizesActivityImage` | `boolean` | no | If TRUE, "Explore Destiny" (the front page of BNet and the companion app) prioritize using the activity image over any overriding Quest or Milestone image provided. This unfortunate hack is brought to you by Trials of The Nine. |
| `hasPredictableDates` | `boolean` | no | A shortcut for clients - and the server - to understand whether we can predict the start and end dates for this event. In practice, there are multiple ways that an event could have predictable date ranges, but not all events will be able to be predicted via any mechanism (for instance, events that are manually triggered on and off) |
| `quests` | `object` | no | The full set of possible Quests that give the overview of the Milestone event/activity in question. Only one of these can be active at a time for a given Conceptual Milestone, but many of them may be "available" for the user to choose from. (for instance, with Milestones you can choose from the three available Quests, but only one can be active at a time) Keyed by the quest item.<br>As of Forsaken (~September 2018), Quest-style Milestones are being removed for many types of activities. There will likely be further revisions to the Milestone concept in the future. |
| `rewards` | `object` | no | If this milestone can provide rewards, this will define the categories into which the individual reward entries are placed.<br>This is keyed by the Category's hash, which is only guaranteed to be unique within a given Milestone. |
| `vendorsDisplayTitle` | `string` | no | If you're going to show Vendors for the Milestone, you can use this as a localized "header" for the section where you show that vendor data. It'll provide a more context-relevant clue about what the vendor's role is in the Milestone. |
| `vendors` | `Destiny.Definitions.Milestones.DestinyMilestoneVendorDefinition[]` | no | Sometimes, milestones will have rewards provided by Vendors. This definition gives the information needed to understand which vendors are relevant, the order in which they should be returned if order matters, and the conditions under which the Vendor is relevant to the user. |
| `values` | `object` | no | Sometimes, milestones will have arbitrary values associated with them that are of interest to us or to third party developers. This is the collection of those values' definitions, keyed by the identifier of the value and providing useful definition information such as localizable names and descriptions for the value. |
| `isInGameMilestone` | `boolean` | no | Some milestones are explicit objectives that you can see and interact with in the game. Some milestones are more conceptual, built by BNet to help advise you on activities and events that happen in-game but that aren't explicitly shown in game as Milestones. If this is TRUE, you can see this as a milestone in the game. If this is FALSE, it's an event or activity you can participate in, but you won't see it as a Milestone in the game's UI. |
| `activities` | `Destiny.Definitions.Milestones.DestinyMilestoneChallengeActivityDefinition[]` | no | A Milestone can now be represented by one or more activities directly (without a backing Quest), and that activity can have many challenges, modifiers, and related to it. |
| `defaultOrder` | `integer(int32)` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Milestones.DestinyMilestoneDisplayPreference

A hint for the UI as to what display information ought to be shown. Defaults to showing the static MilestoneDefinition's display properties.
 If for some reason the indicated property is not populated, fall back to the MilestoneDefinition.displayProperties.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.Definitions.Milestones.DestinyMilestoneQuestDefinition

Any data we need to figure out whether this Quest Item is the currently active one for the conceptual Milestone. Even just typing this description, I already regret it.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `questItemHash` | `integer(uint32)` | no | The item representing this Milestone quest. Use this hash to look up the DestinyInventoryItemDefinition for the quest to find its steps and human readable data. |
| `displayProperties` | `object` | no | The individual quests may have different definitions from the overall milestone: if there's a specific active quest, use these displayProperties instead of that of the overall DestinyMilestoneDefinition. |
| `overrideImage` | `string` | no | If populated, this image can be shown instead of the generic milestone's image when this quest is live, or it can be used to show a background image for the quest itself that differs from that of the Activity or the Milestone. |
| `questRewards` | `object` | no | The rewards you will get for completing this quest, as best as we could extract them from our data. Sometimes, it'll be a decent amount of data. Sometimes, it's going to be sucky. Sorry. |
| `activities` | `object` | no | The full set of all possible "conceptual activities" that are related to this Milestone. Tiers or alternative modes of play within these conceptual activities will be defined as sub-entities. Keyed by the Conceptual Activity Hash. Use the key to look up DestinyActivityDefinition. |
| `destinationHash` | `integer(uint32)` | no | Sometimes, a Milestone's quest is related to an entire Destination rather than a specific activity. In that situation, this will be the hash of that Destination. Hotspots are currently the only Milestones that expose this data, but that does not preclude this data from being returned for other Milestones in the future. |

### Destiny.Definitions.Milestones.DestinyMilestoneQuestRewardItem

A subclass of DestinyItemQuantity, that provides not just the item and its quantity but also information that BNet can - at some point - use internally to provide more robust runtime information about the item's qualities.
If you want it, please ask! We're just out of time to wire it up right now. Or a clever person just may do it with our existing endpoints.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorHash` | `integer(uint32)` | no | The quest reward item *may* be associated with a vendor. If so, this is that vendor. Use this hash to look up the DestinyVendorDefinition. |
| `vendorItemIndex` | `integer(int32)` | no | The quest reward item *may* be associated with a vendor. If so, this is the index of the item being sold, which we can use at runtime to find instanced item information for the reward item. |
| `itemHash` | `integer(uint32)` | no | The hash identifier for the item in question. Use it to look up the item's DestinyInventoryItemDefinition. |
| `itemInstanceId` | `integer(int64)` | no | If this quantity is referring to a specific instance of an item, this will have the item's instance ID. Normally, this will be null. |
| `quantity` | `integer(int32)` | no | The amount of the item needed/available depending on the context of where DestinyItemQuantity is being used. |
| `hasConditionalVisibility` | `boolean` | no | Indicates that this item quantity may be conditionally shown or hidden, based on various sources of state. For example: server flags, account state, or character progress. |

### Destiny.Definitions.Milestones.DestinyMilestoneQuestRewardsDefinition

If rewards are given in a quest - as opposed to overall in the entire Milestone - there's way less to track. We're going to simplify this contract as a result. However, this also gives us the opportunity to potentially put more than just item information into the reward data if we're able to mine it out in the future. Remember this if you come back and ask "why are quest reward items nested inside of their own class?"

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `Destiny.Definitions.Milestones.DestinyMilestoneQuestRewardItem[]` | no | The items that represent your reward for completing the quest.<br>Be warned, these could be "dummy" items: items that are only used to render a good-looking in-game tooltip, but aren't the actual items themselves.<br>For instance, when experience is given there's often a dummy item representing "experience", with quantity being the amount of experience you got. We don't have a programmatic association between those and whatever Progression is actually getting that experience... yet. |

### Destiny.Definitions.Milestones.DestinyMilestoneRewardCategoryDefinition

The definition of a category of rewards, that contains many individual rewards.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `categoryHash` | `integer(uint32)` | no | Identifies the reward category. Only guaranteed unique within this specific component! |
| `categoryIdentifier` | `string` | no | The string identifier for the category, if you want to use it for some end. Guaranteed unique within the specific component. |
| `displayProperties` | `object` | no | Hopefully this is obvious by now. |
| `rewardEntries` | `object` | no | If this milestone can provide rewards, this will define the sets of rewards that can be earned, the conditions under which they can be acquired, internal data that we'll use at runtime to determine whether you've already earned or redeemed this set of rewards, and the category that this reward should be placed under. |
| `order` | `integer(int32)` | no | If you want to use BNet's recommended order for rendering categories programmatically, use this value and compare it to other categories to determine the order in which they should be rendered. I don't feel great about putting this here, I won't lie. |

### Destiny.Definitions.Milestones.DestinyMilestoneRewardEntryDefinition

The definition of a specific reward, which may be contained in a category of rewards and that has optional information about how it is obtained.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `rewardEntryHash` | `integer(uint32)` | no | The identifier for this reward entry. Runtime data will refer to reward entries by this hash. Only guaranteed unique within the specific Milestone. |
| `rewardEntryIdentifier` | `string` | no | The string identifier, if you care about it. Only guaranteed unique within the specific Milestone. |
| `items` | `Destiny.DestinyItemQuantity[]` | no | The items you will get as rewards, and how much of it you'll get. |
| `vendorHash` | `integer(uint32)` | no | If this reward is redeemed at a Vendor, this is the hash of the Vendor to go to in order to redeem the reward. Use this hash to look up the DestinyVendorDefinition. |
| `displayProperties` | `object` | no | For us to bother returning this info, we should be able to return some kind of information about why these rewards are grouped together. This is ideally that information. Look at how confident I am that this will always remain true. |
| `order` | `integer(int32)` | no | If you want to follow BNet's ordering of these rewards, use this number within a given category to order the rewards. Yeah, I know. I feel dirty too. |

### Destiny.Definitions.Milestones.DestinyMilestoneType

The type of milestone. Milestones can be Tutorials, one-time/triggered/non-repeating but not necessarily tutorials, or Repeating Milestones.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`

### Destiny.Definitions.Milestones.DestinyMilestoneValueDefinition

The definition for information related to a key/value pair that is relevant for a particular Milestone or component within the Milestone. 
This lets us more flexibly pass up information that's useful to someone, even if it's not necessarily us.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | `string` | no |  |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |

### Destiny.Definitions.Milestones.DestinyMilestoneVendorDefinition

If the Milestone or a component has vendors whose inventories could/should be displayed that are relevant to it, this will return the vendor in question. 
It also contains information we need to determine whether that vendor is actually relevant at the moment, given the user's current state.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorHash` | `integer(uint32)` | no | The hash of the vendor whose wares should be shown as associated with the Milestone. |

### Destiny.Definitions.PowerCaps.DestinyPowerCapDefinition

Defines a 'power cap' (limit) for gear items, based on the rarity tier and season of release.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `powerCap` | `integer(int32)` | no | The raw value for a power cap. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Presentation.DestinyPresentationChildBlock

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `presentationNodeType` | `integer(int32)` | no |  |
| `parentPresentationNodeHashes` | `integer(uint32)[]` | no |  |
| `displayStyle` | `integer(int32)` | no |  |

### Destiny.Definitions.Presentation.DestinyPresentationNodeBaseDefinition

This is the base class for all presentation system children. Presentation Nodes, Records, Collectibles, and Metrics.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `presentationNodeType` | `integer(int32)` | no |  |
| `traitIds` | `string[]` | no |  |
| `traitHashes` | `integer(uint32)[]` | no |  |
| `parentNodeHashes` | `integer(uint32)[]` | no | A quick reference to presentation nodes that have this node as a child. Presentation nodes can be parented under multiple parents. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Presentation.DestinyPresentationNodeChildEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `presentationNodeHash` | `integer(uint32)` | no |  |
| `nodeDisplayPriority` | `integer(uint32)` | no | Use this value to sort the presentation node children in ascending order. |

### Destiny.Definitions.Presentation.DestinyPresentationNodeChildEntryBase

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `nodeDisplayPriority` | `integer(uint32)` | no | Use this value to sort the presentation node children in ascending order. |

### Destiny.Definitions.Presentation.DestinyPresentationNodeChildrenBlock

As/if presentation nodes begin to host more entities as children, these lists will be added to. One list property exists per type of entity that can be treated as a child of this presentation node, and each holds the identifier of the entity and any associated information needed to display the UI for that entity (if anything)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `presentationNodes` | `Destiny.Definitions.Presentation.DestinyPresentationNodeChildEntry[]` | no |  |
| `collectibles` | `Destiny.Definitions.Presentation.DestinyPresentationNodeCollectibleChildEntry[]` | no |  |
| `records` | `Destiny.Definitions.Presentation.DestinyPresentationNodeRecordChildEntry[]` | no |  |
| `metrics` | `Destiny.Definitions.Presentation.DestinyPresentationNodeMetricChildEntry[]` | no |  |
| `craftables` | `Destiny.Definitions.Presentation.DestinyPresentationNodeCraftableChildEntry[]` | no |  |

### Destiny.Definitions.Presentation.DestinyPresentationNodeCollectibleChildEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `collectibleHash` | `integer(uint32)` | no |  |
| `nodeDisplayPriority` | `integer(uint32)` | no | Use this value to sort the presentation node children in ascending order. |

### Destiny.Definitions.Presentation.DestinyPresentationNodeCraftableChildEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `craftableItemHash` | `integer(uint32)` | no |  |
| `nodeDisplayPriority` | `integer(uint32)` | no | Use this value to sort the presentation node children in ascending order. |

### Destiny.Definitions.Presentation.DestinyPresentationNodeDefinition

A PresentationNode is an entity that represents a logical grouping of other entities visually/organizationally.
For now, Presentation Nodes may contain the following... but it may be used for more in the future:
- Collectibles - Records (Or, as the public will call them, "Triumphs." Don't ask me why we're overloading the term "Triumph", it still hurts me to think about it) - Metrics (aka Stat Trackers) - Other Presentation Nodes, allowing a tree of Presentation Nodes to be created
Part of me wants to break these into conceptual definitions per entity being collected, but the possibility of these different types being mixed in the same UI and the possibility that it could actually be more useful to return the "bare metal" presentation node concept has resulted in me deciding against that for the time being.
We'll see if I come to regret this as well.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `originalIcon` | `string` | no | The original icon for this presentation node, before we futzed with it. |
| `rootViewIcon` | `string` | no | Some presentation nodes are meant to be explicitly shown on the "root" or "entry" screens for the feature to which they are related. You should use this icon when showing them on such a view, if you have a similar "entry point" view in your UI. If you don't have a UI, then I guess it doesn't matter either way does it? |
| `nodeType` | `integer(int32)` | no |  |
| `isSeasonal` | `boolean` | no | Primarily for Guardian Ranks, this property if the contents of this node are tied to the current season. These nodes are shown with a different color for the in-game Guardian Ranks display. |
| `scope` | `integer(int32)` | no | Indicates whether this presentation node's state is determined on a per-character or on an account-wide basis. |
| `objectiveHash` | `integer(uint32)` | no | If this presentation node shows a related objective (for instance, if it tracks the progress of its children), the objective being tracked is indicated here. |
| `completionRecordHash` | `integer(uint32)` | no | If this presentation node has an associated "Record" that you can accomplish for completing its children, this is the identifier of that Record. |
| `children` | `object` | no | The child entities contained by this presentation node. |
| `displayStyle` | `integer(int32)` | no | A hint for how to display this presentation node when it's shown in a list. |
| `screenStyle` | `integer(int32)` | no | A hint for how to display this presentation node when it's shown in its own detail screen. |
| `requirements` | `object` | no | The requirements for being able to interact with this presentation node and its children. |
| `disableChildSubscreenNavigation` | `boolean` | no | If this presentation node has children, but the game doesn't let you inspect the details of those children, that is indicated here. |
| `maxCategoryRecordScore` | `integer(int32)` | no |  |
| `presentationNodeType` | `integer(int32)` | no |  |
| `traitIds` | `string[]` | no |  |
| `traitHashes` | `integer(uint32)[]` | no |  |
| `parentNodeHashes` | `integer(uint32)[]` | no | A quick reference to presentation nodes that have this node as a child. Presentation nodes can be parented under multiple parents. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Presentation.DestinyPresentationNodeMetricChildEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `metricHash` | `integer(uint32)` | no |  |
| `nodeDisplayPriority` | `integer(uint32)` | no | Use this value to sort the presentation node children in ascending order. |

### Destiny.Definitions.Presentation.DestinyPresentationNodeRecordChildEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `recordHash` | `integer(uint32)` | no |  |
| `nodeDisplayPriority` | `integer(uint32)` | no | Use this value to sort the presentation node children in ascending order. |

### Destiny.Definitions.Presentation.DestinyPresentationNodeRequirementsBlock

Presentation nodes can be restricted by various requirements. This defines the rules of those requirements, and the message(s) to be shown if these requirements aren't met.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `entitlementUnavailableMessage` | `string` | no | If this node is not accessible due to Entitlements (for instance, you don't own the required game expansion), this is the message to show. |

### Destiny.Definitions.Presentation.DestinyScoredPresentationNodeBaseDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `maxCategoryRecordScore` | `integer(int32)` | no |  |
| `presentationNodeType` | `integer(int32)` | no |  |
| `traitIds` | `string[]` | no |  |
| `traitHashes` | `integer(uint32)[]` | no |  |
| `parentNodeHashes` | `integer(uint32)[]` | no | A quick reference to presentation nodes that have this node as a child. Presentation nodes can be parented under multiple parents. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Progression.DestinyProgressionLevelRequirementDefinition

These are pre-constructed collections of data that can be used to determine the Level Requirement for an item given a Progression to be tested (such as the Character's level).
For instance, say a character receives a new Auto Rifle, and that Auto Rifle's DestinyInventoryItemDefinition.quality.progressionLevelRequirementHash property is pointing at one of these DestinyProgressionLevelRequirementDefinitions. Let's pretend also that the progressionHash it is pointing at is the Character Level progression. In that situation, the character's level will be used to interpolate a value in the requirementCurve property. The value picked up from that interpolation will be the required level for the item.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `requirementCurve` | `Interpolation.InterpolationPointFloat[]` | no | A curve of level requirements, weighted by the related progressions' level.<br>Interpolate against this curve with the character's progression level to determine what the level requirement of the generated item that is using this data will be. |
| `progressionHash` | `integer(uint32)` | no | The progression whose level should be used to determine the level requirement.<br>Look up the DestinyProgressionDefinition with this hash for more information about the progression in question. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Records.DestinyRecordCompletionBlock

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `partialCompletionObjectiveCountThreshold` | `integer(int32)` | no | The number of objectives that must be completed before the objective is considered "complete" |
| `ScoreValue` | `integer(int32)` | no |  |
| `shouldFireToast` | `boolean` | no |  |
| `toastStyle` | `integer(int32)` | no |  |

### Destiny.Definitions.Records.DestinyRecordDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `scope` | `integer(int32)` | no | Indicates whether this Record's state is determined on a per-character or on an account-wide basis. |
| `presentationInfo` | `Destiny.Definitions.Presentation.DestinyPresentationChildBlock` | no |  |
| `loreHash` | `integer(uint32)` | no |  |
| `objectiveHashes` | `integer(uint32)[]` | no |  |
| `recordValueStyle` | `integer(int32)` | no |  |
| `forTitleGilding` | `boolean` | no |  |
| `shouldShowLargeIcons` | `boolean` | no | A hint to show a large icon for a reward |
| `titleInfo` | `Destiny.Definitions.Records.DestinyRecordTitleBlock` | no |  |
| `completionInfo` | `Destiny.Definitions.Records.DestinyRecordCompletionBlock` | no |  |
| `stateInfo` | `Destiny.Definitions.Records.SchemaRecordStateBlock` | no |  |
| `requirements` | `Destiny.Definitions.Presentation.DestinyPresentationNodeRequirementsBlock` | no |  |
| `expirationInfo` | `Destiny.Definitions.Records.DestinyRecordExpirationBlock` | no |  |
| `intervalInfo` | `object` | no | Some records have multiple 'interval' objectives, and the record may be claimed at each completed interval |
| `rewardItems` | `Destiny.DestinyItemQuantity[]` | no | If there is any publicly available information about rewards earned for achieving this record, this is the list of those items.<br> However, note that some records intentionally have "hidden" rewards. These will not be returned in this list. |
| `recordTypeName` | `string` | no | A display name for the type of record this is (Triumphs, Lore, Medals, Seasonal Challenge, etc.). |
| `presentationNodeType` | `integer(int32)` | no |  |
| `traitIds` | `string[]` | no |  |
| `traitHashes` | `integer(uint32)[]` | no |  |
| `parentNodeHashes` | `integer(uint32)[]` | no | A quick reference to presentation nodes that have this node as a child. Presentation nodes can be parented under multiple parents. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Records.DestinyRecordExpirationBlock

If this record has an expiration after which it cannot be earned, this is some information about that expiration.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `hasExpiration` | `boolean` | no |  |
| `description` | `string` | no |  |
| `icon` | `string` | no |  |

### Destiny.Definitions.Records.DestinyRecordIntervalBlock

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `intervalObjectives` | `Destiny.Definitions.Records.DestinyRecordIntervalObjective[]` | no |  |
| `intervalRewards` | `Destiny.Definitions.Records.DestinyRecordIntervalRewards[]` | no |  |
| `originalObjectiveArrayInsertionIndex` | `integer(int32)` | no |  |

### Destiny.Definitions.Records.DestinyRecordIntervalObjective

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `intervalObjectiveHash` | `integer(uint32)` | no |  |
| `intervalScoreValue` | `integer(int32)` | no |  |

### Destiny.Definitions.Records.DestinyRecordIntervalRewards

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `intervalRewardItems` | `Destiny.DestinyItemQuantity[]` | no |  |

### Destiny.Definitions.Records.DestinyRecordTitleBlock

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `hasTitle` | `boolean` | no |  |
| `titlesByGender` | `object` | no |  |
| `titlesByGenderHash` | `object` | no | For those who prefer to use the definitions. |
| `gildingTrackingRecordHash` | `integer(uint32)` | no |  |

### Destiny.Definitions.Records.SchemaRecordStateBlock

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `featuredPriority` | `integer(int32)` | no |  |
| `obscuredName` | `string` | no | A display name override to show when this record is 'obscured' instead of the default obscured display name. |
| `obscuredDescription` | `string` | no | A display description override to show when this record is 'obscured' instead of the default obscured display description. |

### Destiny.Definitions.Reporting.DestinyReportReasonCategoryDefinition

If you're going to report someone for a Terms of Service violation, you need to choose a category and reason for the report. This definition holds both the categories and the reasons within those categories, for simplicity and my own laziness' sake.
Note tha this means that, to refer to a Reason by reasonHash, you need a combination of the reasonHash *and* the associated ReasonCategory's hash: there are some reasons defined under multiple categories.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `reasons` | `object` | no | The specific reasons for the report under this category. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Reporting.DestinyReportReasonDefinition

A specific reason for being banned. Only accessible under the related category (DestinyReportReasonCategoryDefinition) under which it is shown. Note that this means that report reasons' reasonHash are not globally unique: and indeed, entries like "Other" are defined under most categories for example.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `reasonHash` | `integer(uint32)` | no | The identifier for the reason: they are only guaranteed unique under the Category in which they are found. |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |

### Destiny.Definitions.Seasons.DestinyEventCardDefinition

Defines the properties of an 'Event Card' in Destiny 2, to coincide with a seasonal event for additional challenges, premium rewards, a new seal, and a special title. For example: Solstice of Heroes 2022.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `linkRedirectPath` | `string` | no |  |
| `color` | `Destiny.Misc.DestinyColor` | no |  |
| `images` | `Destiny.Definitions.Seasons.DestinyEventCardImages` | no |  |
| `triumphsPresentationNodeHash` | `integer(uint32)` | no |  |
| `sealPresentationNodeHash` | `integer(uint32)` | no |  |
| `eventCardCurrencyList` | `integer(uint32)[]` | no |  |
| `ticketCurrencyItemHash` | `integer(uint32)` | no |  |
| `ticketVendorHash` | `integer(uint32)` | no |  |
| `ticketVendorCategoryHash` | `integer(uint32)` | no |  |
| `endTime` | `integer(int64)` | no |  |
| `rewardProgressionHash` | `integer(uint32)` | no |  |
| `rewardProgressionHashList` | `integer(uint32)[]` | no |  |
| `weeklyChallengesPresentationNodeHash` | `integer(uint32)` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Seasons.DestinyEventCardImages

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `unownedCardSleeveImagePath` | `string` | no |  |
| `unownedCardSleeveWrapImagePath` | `string` | no |  |
| `cardIncompleteImagePath` | `string` | no |  |
| `cardCompleteImagePath` | `string` | no |  |
| `cardCompleteWrapImagePath` | `string` | no |  |
| `progressIconImagePath` | `string` | no |  |
| `themeBackgroundImagePath` | `string` | no |  |

### Destiny.Definitions.Seasons.DestinySeasonActDefinition

Defines the name, start time and ranks included in an Act of an Episode.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayName` | `string` | no | The name of the Act. |
| `startTime` | `string(date-time)` | no | The start time of the Act. |
| `rankCount` | `integer(int32)` | no | The number of ranks included in the Act. |

### Destiny.Definitions.Seasons.DestinySeasonDefinition

Defines a canonical "Season" of Destiny: a range of a few months where the game highlights certain challenges, provides new loot, has new Clan-related rewards and celebrates various seasonal events.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `backgroundImagePath` | `string` | no |  |
| `seasonNumber` | `integer(int32)` | no |  |
| `startDate` | `string(date-time)` | no |  |
| `endDate` | `string(date-time)` | no |  |
| `seasonPassHash` | `integer(uint32)` | no |  |
| `seasonPassList` | `Destiny.Definitions.Seasons.DestinySeasonPassReference[]` | no |  |
| `seasonPassProgressionHash` | `integer(uint32)` | no |  |
| `artifactItemHash` | `integer(uint32)` | no |  |
| `sealPresentationNodeHash` | `integer(uint32)` | no |  |
| `acts` | `Destiny.Definitions.Seasons.DestinySeasonActDefinition[]` | no | A list of Acts for the Episode |
| `seasonalChallengesPresentationNodeHash` | `integer(uint32)` | no |  |
| `preview` | `object` | no | Optional - Defines the promotional text, images, and links to preview this season. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Seasons.DestinySeasonPassDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `rewardProgressionHash` | `integer(uint32)` | no | This is the progression definition related to the progression for the initial levels 1-100 that provide item rewards for the Season pass. Further experience after you reach the limit is provided in the "Prestige" progression referred to by prestigeProgressionHash. |
| `prestigeProgressionHash` | `integer(uint32)` | no | I know what you're thinking, but I promise we're not going to duplicate and drown you. Instead, we're giving you sweet, sweet power bonuses.<br> Prestige progression is further progression that you can make on the Season pass after you gain max ranks, that will ultimately increase your power/light level over the theoretical limit. |
| `linkRedirectPath` | `string` | no |  |
| `color` | `Destiny.Misc.DestinyColor` | no |  |
| `images` | `Destiny.Definitions.Seasons.DestinySeasonPassImages` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Seasons.DestinySeasonPassImages

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `iconImagePath` | `string` | no |  |
| `themeBackgroundImagePath` | `string` | no |  |

### Destiny.Definitions.Seasons.DestinySeasonPassReference

Defines the hash, unlock flag and start time of season passes

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `seasonPassHash` | `integer(uint32)` | no | The Season Pass Hash |
| `seasonPassStartDate` | `string(date-time)` | no | The Season Pass Start Date |
| `seasonPassEndDate` | `string(date-time)` | no | The Season Pass End Date |

### Destiny.Definitions.Seasons.DestinySeasonPreviewDefinition

Defines the promotional text, images, and links to preview this season.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | no | A localized description of the season. |
| `linkPath` | `string` | no | A relative path to learn more about the season. Web browsers should be automatically redirected to the user's Bungie.net locale. For example: "/SeasonOfTheChosen" will redirect to "/7/en/Seasons/SeasonOfTheChosen" for English users. |
| `videoLink` | `string` | no | An optional link to a localized video, probably YouTube. |
| `images` | `Destiny.Definitions.Seasons.DestinySeasonPreviewImageDefinition[]` | no | A list of images to preview the seasonal content. Should have at least three to show. |

### Destiny.Definitions.Seasons.DestinySeasonPreviewImageDefinition

Defines the thumbnail icon, high-res image, and video link for promotional images

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `thumbnailImage` | `string` | no | A thumbnail icon path to preview seasonal content, probably 480x270. |
| `highResImage` | `string` | no | An optional path to a high-resolution image, probably 1920x1080. |

### Destiny.Definitions.Social.DestinySocialCommendationDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `cardImagePath` | `string` | no |  |
| `color` | `Destiny.Misc.DestinyColor` | no |  |
| `displayPriority` | `integer(int32)` | no |  |
| `activityGivingLimit` | `integer(int32)` | no |  |
| `parentCommendationNodeHash` | `integer(uint32)` | no |  |
| `displayActivities` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition[]` | no | The display properties for the the activities that this commendation is available in. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Social.DestinySocialCommendationNodeDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `color` | `object` | no | The color associated with this group of commendations. |
| `tintedIcon` | `string` | no | A version of the displayProperties icon tinted with the color of this node. |
| `parentCommendationNodeHash` | `integer(uint32)` | no |  |
| `childCommendationNodeHashes` | `integer(uint32)[]` | no | A list of hashes that map to child commendation nodes. Only the root commendations node is expected to have child nodes. |
| `childCommendationHashes` | `integer(uint32)[]` | no | A list of hashes that map to child commendations. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Sockets.DestinyInsertPlugActionDefinition

Data related to what happens while a plug is being inserted, mostly for UI purposes.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `actionExecuteSeconds` | `integer(int32)` | no | How long it takes for the Plugging of the item to be completed once it is initiated, if you care. |
| `actionType` | `integer(int32)` | no | The type of action being performed when you act on this Socket Type. The most common value is "insert plug", but there are others as well (for instance, a "Masterwork" socket may allow for Re-initialization, and an Infusion socket allows for items to be consumed to upgrade the item) |

### Destiny.Definitions.Sockets.DestinyPlugSetDefinition

Sometimes, we have large sets of reusable plugs that are defined identically and thus can (and in some cases, are so large that they *must*) be shared across the places where they are used. These are the definitions for those reusable sets of plugs. 
 See DestinyItemSocketEntryDefinition.plugSource and reusablePlugSetHash for the relationship between these reusable plug sets and the sockets that leverage them (for starters, Emotes).
 As of the release of Shadowkeep (Late 2019), these will begin to be sourced from game content directly - which means there will be many more of them, but it also means we may not get all data that we used to get for them.
 DisplayProperties, in particular, will no longer be guaranteed to contain valid information. We will make a best effort to guess what ought to be populated there where possible, but it will be invalid for many/most plug sets.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | If you want to show these plugs in isolation, these are the display properties for them. |
| `reusablePlugItems` | `Destiny.Definitions.DestinyItemSocketEntryPlugItemRandomizedDefinition[]` | no | This is a list of pre-determined plugs that can be plugged into this socket, without the character having the plug in their inventory.<br>If this list is populated, you will not be allowed to plug an arbitrary item in the socket: you will only be able to choose from one of these reusable plugs. |
| `isFakePlugSet` | `boolean` | no | Mostly for our debugging or reporting bugs, BNet is making "fake" plug sets in a desperate effort to reduce socket sizes.<br> If this is true, the plug set was generated by BNet: if it looks wrong, that's a good indicator that it's bungie.net that fucked this up. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Sockets.DestinyPlugWhitelistEntryDefinition

Defines a plug "Category" that is allowed to be plugged into a socket of this type.
This should be compared against a given plug item's DestinyInventoryItemDefinition.plug.plugCategoryHash, which indicates the plug item's category.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `categoryHash` | `integer(uint32)` | no | The hash identifier of the Plug Category to compare against the plug item's plug.plugCategoryHash.<br>Note that this does NOT relate to any Definition in itself, it is only used for comparison purposes. |
| `categoryIdentifier` | `string` | no | The string identifier for the category, which is here mostly for debug purposes. |
| `reinitializationPossiblePlugHashes` | `integer(uint32)[]` | no | The list of all plug items (DestinyInventoryItemDefinition) that the socket may randomly be populated with when reinitialized.<br>Which ones you should actually show are determined by the plug being inserted into the socket, and the socket’s type.<br>When you inspect the plug that could go into a Masterwork Socket, look up the socket type of the socket being inspected and find the DestinySocketTypeDefinition.<br>Then, look at the Plugs that can fit in that socket. Find the Whitelist in the DestinySocketTypeDefinition that matches the plug item’s categoryhash.<br>That whitelist entry will potentially have a new “reinitializationPossiblePlugHashes” property.If it does, that means we know what it will roll if you try to insert this plug into this socket. |

### Destiny.Definitions.Sockets.DestinySocketCategoryDefinition

Sockets on an item are organized into Categories visually.
You can find references to the socket category defined on an item's DestinyInventoryItemDefinition.sockets.socketCategories property.
This has the display information for rendering the categories' header, and a hint for how the UI should handle showing this category.
The shitty thing about this, however, is that the socket categories' UI style can be overridden by the item's UI style. For instance, the Socket Category used by Emote Sockets says it's "consumable," but that's a lie: they're all reusable, and overridden by the detail UI pages in ways that we can't easily account for in the API.
As a result, I will try to compile these rules into the individual sockets on items, and provide the best hint possible there through the plugSources property. In the future, I may attempt to use this information in conjunction with the item to provide a more usable UI hint on the socket layer, but for now improving the consistency of plugSources is the best I have time to provide. (See https://github.com/Bungie-net/api/issues/522 for more info)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `uiCategoryStyle` | `integer(uint32)` | no | A string hinting to the game's UI system about how the sockets in this category should be displayed.<br>BNet doesn't use it: it's up to you to find valid values and make your own special UI if you want to honor this category style. |
| `categoryStyle` | `integer(int32)` | no | Same as uiCategoryStyle, but in a more usable enumeration form. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Sockets.DestinySocketTypeDefinition

All Sockets have a "Type": a set of common properties that determine when the socket allows Plugs to be inserted, what Categories of Plugs can be inserted, and whether the socket is even visible at all given the current game/character/account state.
See DestinyInventoryItemDefinition for more information about Socketed items and Plugs.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `object` | no | There are fields for this display data, but they appear to be unpopulated as of now. I am not sure where in the UI these would show if they even were populated, but I will continue to return this data in case it becomes useful. |
| `insertAction` | `object` | no | Defines what happens when a plug is inserted into sockets of this type. |
| `plugWhitelist` | `Destiny.Definitions.Sockets.DestinyPlugWhitelistEntryDefinition[]` | no | A list of Plug "Categories" that are allowed to be plugged into sockets of this type.<br>These should be compared against a given plug item's DestinyInventoryItemDefinition.plug.plugCategoryHash, which indicates the plug item's category.<br>If the plug's category matches any whitelisted plug, or if the whitelist is empty, it is allowed to be inserted. |
| `socketCategoryHash` | `integer(uint32)` | no |  |
| `visibility` | `integer(int32)` | no | Sometimes a socket isn't visible. These are some of the conditions under which sockets of this type are not visible. Unfortunately, the truth of visibility is much, much more complex. Best to rely on the live data for whether the socket is visible and enabled. |
| `alwaysRandomizeSockets` | `boolean` | no |  |
| `isPreviewEnabled` | `boolean` | no |  |
| `hideDuplicateReusablePlugs` | `boolean` | no |  |
| `overridesUiAppearance` | `boolean` | no | This property indicates if the socket type determines whether Emblem icons and nameplates should be overridden by the inserted plug item's icon and nameplate. |
| `avoidDuplicatesOnInitialization` | `boolean` | no |  |
| `currencyScalars` | `Destiny.Definitions.Sockets.DestinySocketTypeScalarMaterialRequirementEntry[]` | no |  |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Sockets.DestinySocketTypeScalarMaterialRequirementEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `currencyItemHash` | `integer(uint32)` | no |  |
| `scalarValue` | `integer(int32)` | no |  |

### Destiny.Definitions.Sources.DestinyItemSourceDefinition

Properties of a DestinyInventoryItemDefinition that store all of the information we were able to discern about how the item spawns, and where you can find the item.
Items will have many of these sources, one per level at which it spawns, to try and give more granular data about where items spawn for specific level ranges.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `level` | `integer(int32)` | no | The level at which the item spawns. Essentially the Primary Key for this source data: there will be multiple of these source entries per item that has source data, grouped by the level at which the item spawns. |
| `minQuality` | `integer(int32)` | no | The minimum Quality at which the item spawns for this level. Examine DestinyInventoryItemDefinition for more information about what Quality means. Just don't ask Phaedrus about it, he'll never stop talking and you'll have to write a book about it. |
| `maxQuality` | `integer(int32)` | no | The maximum quality at which the item spawns for this level. |
| `minLevelRequired` | `integer(int32)` | no | The minimum Character Level required for equipping the item when the item spawns at the item level defined on this DestinyItemSourceDefinition, as far as we saw in our processing. |
| `maxLevelRequired` | `integer(int32)` | no | The maximum Character Level required for equipping the item when the item spawns at the item level defined on this DestinyItemSourceDefinition, as far as we saw in our processing. |
| `computedStats` | `object` | no | The stats computed for this level/quality range. |
| `sourceHashes` | `integer(uint32)[]` | no | The DestinyRewardSourceDefinitions found that can spawn the item at this level. |

### Destiny.Definitions.Traits.DestinyTraitDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayProperties` | `Destiny.Definitions.Common.DestinyDisplayPropertiesDefinition` | no |  |
| `displayHint` | `string` | no | An identifier for how this trait can be displayed. For example: a 'keyword' hint to show an explanation for certain related terms. |
| `hash` | `integer(uint32)` | no | The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.<br>When entities refer to each other in Destiny content, it is this hash that they are referring to. |
| `index` | `integer(int32)` | no | The index of the entity as it was found in the investment tables. |
| `redacted` | `boolean` | no | If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry! |

### Destiny.Definitions.Vendors.DestinyVendorLocationDefinition

These definitions represent vendors' locations and relevant display information at different times in the game.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `destinationHash` | `integer(uint32)` | no | The hash identifier for a Destination at which this vendor may be located. Each destination where a Vendor may exist will only ever have a single entry. |
| `backgroundImagePath` | `string` | no | The relative path to the background image representing this Vendor at this location, for use in a banner. |

### Destiny.DestinyActivity

Represents the "Live" data that we can obtain about a Character's status with a specific Activity. This will tell you whether the character can participate in the activity, as well as some other basic mutable information. 
Meant to be combined with static DestinyActivityDefinition data for a full picture of the Activity.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no | The hash identifier of the Activity. Use this to look up the DestinyActivityDefinition of the activity. |
| `isNew` | `boolean` | no | If true, then the activity should have a "new" indicator in the Director UI. |
| `canLead` | `boolean` | no | If true, the user is allowed to lead a Fireteam into this activity. |
| `canJoin` | `boolean` | no | If true, the user is allowed to join with another Fireteam in this activity. |
| `isCompleted` | `boolean` | no | If true, we both have the ability to know that the user has completed this activity and they have completed it. Unfortunately, we can't necessarily know this for all activities. As such, this should probably only be used if you already know in advance which specific activities you wish to check. |
| `isVisible` | `boolean` | no | If true, the user should be able to see this activity. |
| `displayLevel` | `integer(int32)` | no | The difficulty level of the activity, if applicable. |
| `recommendedLight` | `integer(int32)` | no | The recommended light level for the activity, if applicable. |
| `difficultyTier` | `integer(int32)` | no | A DestinyActivityDifficultyTier enum value indicating the difficulty of the activity. |
| `challenges` | `Destiny.Challenges.DestinyChallengeStatus[]` | no |  |
| `modifierHashes` | `integer(uint32)[]` | no | If the activity has modifiers, this will be the list of modifiers that all variants have in common. Perform lookups against DestinyActivityModifierDefinition which defines the modifier being applied to get at the modifier data.<br>Note that, in the DestinyActivityDefinition, you will see many more modifiers than this being referred to: those are all *possible* modifiers for the activity, not the active ones. Use only the active ones to match what's really live. |
| `booleanActivityOptions` | `object` | no | The set of activity options for this activity, keyed by an identifier that's unique for this activity (not guaranteed to be unique between or across all activities, though should be unique for every *variant* of a given *conceptual* activity: for instance, the original D2 Raid has many variant DestinyActivityDefinitions. While other activities could potentially have the same option hashes, for any given D2 base Raid variant the hash will be unique).<br>As a concrete example of this data, the hashes you get for Raids will correspond to the currently active "Challenge Mode".<br>We don't have any human readable information for these, but savvy 3rd party app users could manually associate the key (a hash identifier for the "option" that is enabled/disabled) and the value (whether it's enabled or disabled presently)<br>On our side, we don't necessarily even know what these are used for (the game designers know, but we don't), and we have no human readable data for them. In order to use them, you will have to do some experimentation. |
| `loadoutRequirementIndex` | `integer(int32)` | no | If returned, this is the index into the DestinyActivityDefinition's "loadouts" property, indicating the currently active loadout requirements. |
| `visibleRewards` | `Destiny.Definitions.DestinyActivityRewardMapping[]` | no | A filtered list of reward mappings with only the currently visible reward items. |
| `isFocusedActivity` | `boolean` | no | Whether or not this activity is currently in the "featured" carousel of the Portal |
| `leaderRequirementFailureIndices` | `integer(int32)[]` | no | Indexes of failure if this activity is inaccessible as a fireteam leader |
| `fireteamRequirementFailureIndices` | `integer(int32)[]` | no | Indexes of failure if this activity is inaccessible as a fireteam member |

### Destiny.DestinyActivityDifficultyId

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`

### Destiny.DestinyActivityDifficultyTier

An enumeration representing the potential difficulty levels of an activity. Their names are... more qualitative than quantitative.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`

### Destiny.DestinyActivityDifficultyTierCollectionComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `difficultyTierCollectionHash` | `integer(uint32)` | no |  |
| `difficultyTiers` | `Destiny.DestinyActivityDifficultyTierComponent[]` | no |  |

### Destiny.DestinyActivityDifficultyTierComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `difficultyTierIndex` | `integer(int32)` | no |  |
| `fixedActivitySkulls` | `Destiny.DestinyActivitySkullComponent[]` | no |  |

### Destiny.DestinyActivityDifficultyTierType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyActivityModeCategory

Activity Modes are grouped into a few possible broad categories.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.DestinyActivityModifierConnotation

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`

### Destiny.DestinyActivityModifierDisplayCategory

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`

### Destiny.DestinyActivityNavPointType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`
- `15`
- `16`

### Destiny.DestinyActivityRewardDisplayMode

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyActivitySelectableSkullCollectionComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `selectableSkullCollectionHash` | `integer(uint32)` | no |  |
| `selectableSkulls` | `Destiny.DestinyActivitySkullComponent[]` | no |  |

### Destiny.DestinyActivitySkullComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `hash` | `integer(uint32)` | no |  |
| `skullIdentifierHash` | `integer(uint32)` | no |  |
| `isEnabled` | `boolean` | no |  |

### Destiny.DestinyActivitySkullDynamicUse

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.DestinyActivityTreeChildSortMode

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyActivityTreeType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Destiny.DestinyAmmunitionType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Destiny.DestinyBreakerType

A plug can optionally have a "Breaker Type": a special ability that can affect units in unique ways. Activating this plug can grant one of these types.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.DestinyClass

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.DestinyCollectibleState

A Flags Enumeration/bitmask where each bit represents a different state that the Collectible can be in. A collectible can be in any number of these states, and you can choose to use or ignore any or all of them when making your own UI that shows Collectible info. Our displays are going to honor them, but we're also the kind of people who only pretend to inhale before quickly passing it to the left. So, you know, do what you got to do.
(All joking aside, please note the caveat I mention around the Invisible flag: there are cases where it is in the best interest of your users to honor these flags even if you're a "show all the data" person. Collector-oriented compulsion is a very unfortunate and real thing, and I would hate to instill that compulsion in others through showing them items that they cannot earn. Please consider this when you are making your own apps/sites.)

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`

### Destiny.DestinyComponentType

Represents the possible components that can be returned from Destiny "Get" calls such as GetProfile, GetCharacter, GetVendor etc...
When making one of these requests, you will pass one or more of these components as a comma separated list in the "?components=" querystring parameter. For instance, if you want baseline Profile data, Character Data, and character progressions, you would pass "?components=Profiles,Characters,CharacterProgressions" You may use either the numerical or string values.

Type: `integer enum`

Enum values:

- `0`
- `100`
- `101`
- `102`
- `103`
- `104`
- `105`
- `200`
- `201`
- `202`
- `203`
- `204`
- `205`
- `206`
- `300`
- `301`
- `302`
- `303`
- `304`
- `305`
- `306`
- `307`
- `308`
- `309`
- `310`
- `400`
- `401`
- `402`
- `500`
- `600`
- `700`
- `800`
- `900`
- `1000`
- `1100`
- `1200`
- `1300`
- `1400`

### Destiny.DestinyEnergyType

Represents the socket energy types for Armor 2.0, Ghosts 2.0, and Stasis subclasses.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`

### Destiny.DestinyEquipItemResult

The results of an Equipping operation performed through the Destiny API.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemInstanceId` | `integer(int64)` | no | The instance ID of the item in question (all items that can be equipped must, but definition, be Instanced and thus have an Instance ID that you can use to refer to them) |
| `equipStatus` | `integer(int32)` | no | A PlatformErrorCodes enum indicating whether it succeeded, and if it failed why. |

### Destiny.DestinyEquipItemResults

The results of a bulk Equipping operation performed through the Destiny API.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `equipResults` | `Destiny.DestinyEquipItemResult[]` | no |  |

### Destiny.DestinyGamePrivacySetting

A player can choose to restrict requests to join their Fireteam to specific states. These are the possible states a user can choose.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Destiny.DestinyGameVersions

A flags enumeration/bitmask indicating the versions of the game that a given user has purchased.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`
- `128`
- `256`
- `512`
- `1024`
- `2048`
- `4096`

### Destiny.DestinyGatingScope

This enumeration represents the most restrictive type of gating that is being performed by an entity. This is useful as a shortcut to avoid a lot of lookups when determining whether the gating on an Entity applies to everyone equally, or to their specific Profile or Character states.
None = There is no gating on this item.
Global = The gating on this item is based entirely on global game state. It will be gated the same for everyone.
Clan = The gating on this item is at the Clan level. For instance, if you're gated by Clan level this will be the case.
Profile = The gating includes Profile-specific checks, but not on the Profile's characters. An example of this might be when you acquire an Emblem: the Emblem will be available in your Kiosk for all characters in your Profile from that point onward.
Character = The gating includes Character-specific checks, including character level restrictions. An example of this might be an item that you can't purchase from a Vendor until you reach a specific Character Level.
Item = The gating includes item-specific checks. For BNet, this generally implies that we'll show this data only on a character level or deeper.
AssumedWorstCase = The unlocks and checks being used for this calculation are of an unknown type and are used for unknown purposes. For instance, if some great person decided that an unlock value should be globally scoped, but then the game changes it using character-specific data in a way that BNet doesn't know about. Because of the open-ended potential for this to occur, many unlock checks for "globally" scoped unlock data may be assumed as the worst case unless it has been specifically whitelisted as otherwise. That sucks, but them's the breaks.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`

### Destiny.DestinyGender

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyGraphNodeState

Represents a potential state of an Activity Graph node.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Destiny.DestinyItemQuantity

Used in a number of Destiny contracts to return data about an item stack and its quantity. Can optionally return an itemInstanceId if the item is instanced - in which case, the quantity returned will be 1. If it's not... uh, let me know okay? Thanks.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemHash` | `integer(uint32)` | no | The hash identifier for the item in question. Use it to look up the item's DestinyInventoryItemDefinition. |
| `itemInstanceId` | `integer(int64)` | no | If this quantity is referring to a specific instance of an item, this will have the item's instance ID. Normally, this will be null. |
| `quantity` | `integer(int32)` | no | The amount of the item needed/available depending on the context of where DestinyItemQuantity is being used. |
| `hasConditionalVisibility` | `boolean` | no | Indicates that this item quantity may be conditionally shown or hidden, based on various sources of state. For example: server flags, account state, or character progress. |

### Destiny.DestinyItemSortType

Determines how items are sorted in an inventory bucket.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyItemSubType

This Enumeration further classifies items by more specific categorizations than DestinyItemType. The "Sub-Type" is where we classify and categorize items one step further in specificity: "Auto Rifle" instead of just "Weapon" for example, or "Vanguard Bounty" instead of merely "Bounty".
These sub-types are provided for historical compatibility with Destiny 1, but an ideal alternative is to use DestinyItemCategoryDefinitions and the DestinyItemDefinition.itemCategories property instead. Item Categories allow for arbitrary hierarchies of specificity, and for items to belong to multiple categories across multiple hierarchies simultaneously. For this enum, we pick a single type as a "best guess" fit.
NOTE: This is not all of the item types available, and some of these are holdovers from Destiny 1 that may or may not still exist.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`
- `16`
- `17`
- `18`
- `19`
- `20`
- `21`
- `22`
- `23`
- `24`
- `25`
- `26`
- `27`
- `28`
- `29`
- `30`
- `31`
- `32`
- `33`

### Destiny.DestinyItemType

An enumeration that indicates the high-level "type" of the item, attempting to iron out the context specific differences for specific instances of an entity. For instance, though a weapon may be of various weapon "Types", in DestinyItemType they are all classified as "Weapon". This allows for better filtering on a higher level of abstraction for the concept of types.
 This enum is provided for historical compatibility with Destiny 1, but an ideal alternative is to use DestinyItemCategoryDefinitions and the DestinyItemDefinition.itemCategories property instead. Item Categories allow for arbitrary hierarchies of specificity, and for items to belong to multiple categories across multiple hierarchies simultaneously. For this enum, we pick a single type as a "best guess" fit.
 NOTE: This is not all of the item types available, and some of these are holdovers from Destiny 1 that may or may not still exist.
 I keep updating these because they're so damn convenient. I guess I shouldn't fight it.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`
- `15`
- `16`
- `17`
- `18`
- `19`
- `20`
- `21`
- `22`
- `23`
- `24`
- `25`
- `26`
- `27`
- `28`
- `29`
- `30`

### Destiny.DestinyJoinClosedReasons

A Flags enumeration representing the reasons why a person can't join this user's fireteam.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32768`

### Destiny.DestinyObjectiveGrantStyle

Some Objectives provide perks, generally as part of providing some kind of interesting modifier for a Challenge or Quest. This indicates when the Perk is granted.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyObjectiveUiStyle

If the objective has a known UI label, this enumeration will represent it.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`

### Destiny.DestinyPartyMemberStates

A flags enumeration that represents a Fireteam Member's status.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`

### Destiny.DestinyPresentationDisplayStyle

A hint for how the presentation node should be displayed when shown in a list. How you use this is your UI is up to you.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`
- `15`
- `16`
- `17`
- `18`
- `19`
- `20`

### Destiny.DestinyPresentationNodeState

I know this doesn't look like a Flags Enumeration/bitmask right now, but I assure you it is. This is the possible states that a Presentation Node can be in, and it is almost certain that its potential states will increase in the future. So don't treat it like a straight up enumeration.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyPresentationNodeType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`

### Destiny.DestinyPresentationScreenStyle

A hint for what screen should be shown when this presentation node is clicked into. How you use this is your UI is up to you.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyProgression

Information about a current character's status with a Progression. A progression is a value that can increase with activity and has levels. Think Character Level and Reputation Levels. Combine this "live" data with the related DestinyProgressionDefinition for a full picture of the Progression.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `progressionHash` | `integer(uint32)` | no | The hash identifier of the Progression in question. Use it to look up the DestinyProgressionDefinition in static data. |
| `dailyProgress` | `integer(int32)` | no | The amount of progress earned today for this progression. |
| `dailyLimit` | `integer(int32)` | no | If this progression has a daily limit, this is that limit. |
| `weeklyProgress` | `integer(int32)` | no | The amount of progress earned toward this progression in the current week. |
| `weeklyLimit` | `integer(int32)` | no | If this progression has a weekly limit, this is that limit. |
| `currentProgress` | `integer(int32)` | no | This is the total amount of progress obtained overall for this progression (for instance, the total amount of Character Level experience earned) |
| `level` | `integer(int32)` | no | This is the level of the progression (for instance, the Character Level). |
| `levelCap` | `integer(int32)` | no | This is the maximum possible level you can achieve for this progression (for example, the maximum character level obtainable) |
| `stepIndex` | `integer(int32)` | no | Progressions define their levels in "steps". Since the last step may be repeatable, the user may be at a higher level than the actual Step achieved in the progression. Not necessarily useful, but potentially interesting for those cruising the API. Relate this to the "steps" property of the DestinyProgression to see which step the user is on, if you care about that. (Note that this is Content Version dependent since it refers to indexes.) |
| `progressToNextLevel` | `integer(int32)` | no | The amount of progression (i.e. "Experience") needed to reach the next level of this Progression. Jeez, progression is such an overloaded word. |
| `nextLevelAt` | `integer(int32)` | no | The total amount of progression (i.e. "Experience") needed in order to reach the next level. |
| `currentResetCount` | `integer(int32)` | no | The number of resets of this progression you've executed this season, if applicable to this progression. |
| `seasonResets` | `Destiny.DestinyProgressionResetEntry[]` | no | Information about historical resets of this progression, if there is any data for it. |
| `rewardItemStates` | `integer(int32)[]` | no | Information about historical rewards for this progression, if there is any data for it. |
| `rewardItemSocketOverrideStates` | `object` | no | Information about items stats and states that have socket overrides, if there is any data for it. |

### Destiny.DestinyProgressionResetEntry

Represents a season and the number of resets you had in that season.
 We do not necessarily - even for progressions with resets - track it over all seasons. So be careful and check the season numbers being returned.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `season` | `integer(int32)` | no |  |
| `resets` | `integer(int32)` | no |  |

### Destiny.DestinyProgressionRewardItemAcquisitionBehavior

Represents the different kinds of acquisition behavior for progression reward items.

Type: `integer enum`

Enum values:

- `0`
- `1`

### Destiny.DestinyProgressionRewardItemSocketOverrideState

Represents the stats and item state if applicable for progression reward items with socket overrides

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `rewardItemStats` | `object` | no | Information about the computed stats from socket and plug overrides for this progression, if there is any data for it. |
| `itemState` | `integer(int32)` | no | Information about the item state, specifically deepsight if there is any data for it |

### Destiny.DestinyProgressionRewardItemState

Represents the different states a progression reward item can be in.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`

### Destiny.DestinyProgressionScope

There are many Progressions in Destiny (think Character Level, or Reputation). These are the various "Scopes" of Progressions, which affect many things: * Where/if they are stored * How they are calculated * Where they can be used in other game logic

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`

### Destiny.DestinyProgressionStepDisplayEffect

If progression is earned, this determines whether the progression shows visual effects on the character or its item - or neither.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyRace

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.DestinyRecordState

A Flags enumeration/bitmask where each bit represents a possible state that a Record/Triumph can be in.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`

### Destiny.DestinyRecordToastStyle

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`
- `15`
- `16`

### Destiny.DestinyRecordValueStyle

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Destiny.DestinyScope

There's a lot of places where we need to know scope on more than just a profile or character level. For everything else, there's this more generic sense of scope.

Type: `integer enum`

Enum values:

- `0`
- `1`

### Destiny.DestinySocketCategoryStyle

Represents the possible and known UI styles used by the game for rendering Socket Categories.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`

### Destiny.DestinySocketVisibility

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.DestinyStat

Represents a stat on an item *or* Character (NOT a Historical Stat, but a physical attribute stat like Attack, Defense etc...)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `statHash` | `integer(uint32)` | no | The hash identifier for the Stat. Use it to look up the DestinyStatDefinition for static data about the stat. |
| `value` | `integer(int32)` | no | The current value of the Stat. |

### Destiny.DestinyStatAggregationType

When a Stat (DestinyStatDefinition) is aggregated, this is the rules used for determining the level and formula used for aggregation.
* CharacterAverage = apply a weighted average using the related DestinyStatGroupDefinition on the DestinyInventoryItemDefinition across the character's equipped items. See both of those definitions for details. * Character = don't aggregate: the stat should be located and used directly on the character. * Item = don't aggregate: the stat should be located and used directly on the item.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyStatCategory

At last, stats have categories. Use this for whatever purpose you might wish.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.DestinyTalentNode

I see you've come to find out more about Talent Nodes. I'm so sorry. Talent Nodes are the conceptual, visual nodes that appear on Talent Grids. Talent Grids, in Destiny 1, were found on almost every instanced item: they had Nodes that could be activated to change the properties of the item. In Destiny 2, Talent Grids only exist for Builds/Subclasses, and while the basic concept is the same (Nodes can be activated once you've gained sufficient Experience on the Item, and provide effects), there are some new concepts from Destiny 1. Examine DestinyTalentGridDefinition and its subordinates for more information. This is the "Live" information for the current status of a Talent Node on a specific item. Talent Nodes have many Steps, but only one can be active at any one time: and it is the Step that determines both the visual and the game state-changing properties that the Node provides. Examine this and DestinyTalentNodeStepDefinition carefully. *IMPORTANT NOTE* Talent Nodes are, unfortunately, Content Version DEPENDENT. Though they refer to hashes for Nodes and Steps, those hashes are not guaranteed to be immutable across content versions. This is a source of great exasperation for me, but as a result anyone using Talent Grid data must ensure that the content version of their static content matches that of the server responses before showing or making decisions based on talent grid data.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `nodeIndex` | `integer(int32)` | no | The index of the Talent Node being referred to (an index into DestinyTalentGridDefinition.nodes[]). CONTENT VERSION DEPENDENT. |
| `nodeHash` | `integer(uint32)` | no | The hash of the Talent Node being referred to (in DestinyTalentGridDefinition.nodes). Deceptively CONTENT VERSION DEPENDENT. We have no guarantee of the hash's immutability between content versions. |
| `state` | `integer(int32)` | no | An DestinyTalentNodeState enum value indicating the node's state: whether it can be activated or swapped, and why not if neither can be performed. |
| `isActivated` | `boolean` | no | If true, the node is activated: it's current step then provides its benefits. |
| `stepIndex` | `integer(int32)` | no | The currently relevant Step for the node. It is this step that has rendering data for the node and the benefits that are provided if the node is activated. (the actual rules for benefits provided are extremely complicated in theory, but with how Talent Grids are being used in Destiny 2 you don't have to worry about a lot of those old Destiny 1 rules.) This is an index into: DestinyTalentGridDefinition.nodes[nodeIndex].steps[stepIndex] |
| `materialsToUpgrade` | `Destiny.Definitions.DestinyMaterialRequirement[]` | no | If the node has material requirements to be activated, this is the list of those requirements. |
| `activationGridLevel` | `integer(int32)` | no | The progression level required on the Talent Grid in order to be able to activate this talent node. Talent Grids have their own Progression - similar to Character Level, but in this case it is experience related to the item itself. |
| `progressPercent` | `number(float)` | no | If you want to show a progress bar or circle for how close this talent node is to being activate-able, this is the percentage to show. It follows the node's underlying rules about when the progress bar should first show up, and when it should be filled. |
| `hidden` | `boolean` | no | Whether or not the talent node is actually visible in the game's UI. Whether you want to show it in your own UI is up to you! I'm not gonna tell you who to sock it to. |
| `nodeStatsBlock` | `object` | no | This property has some history. A talent grid can provide stats on both the item it's related to and the character equipping the item. This returns data about those stat bonuses. |

### Destiny.DestinyTalentNodeStatBlock

This property has some history. A talent grid can provide stats on both the item it's related to and the character equipping the item. This returns data about those stat bonuses.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `currentStepStats` | `Destiny.DestinyStat[]` | no | The stat benefits conferred when this talent node is activated for the current Step that is active on the node. |
| `nextStepStats` | `Destiny.DestinyStat[]` | no | This is a holdover from the old days of Destiny 1, when a node could be activated multiple times, conferring multiple steps worth of benefits: you would use this property to show what activating the "next" step on the node would provide vs. what the current step is providing. While Nodes are currently not being used this way, the underlying system for this functionality still exists. I hesitate to remove this property while the ability for designers to make such a talent grid still exists. Whether you want to show it is up to you. |

### Destiny.DestinyTalentNodeState

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`

### Destiny.DestinyUnlockStatus

Indicates the status of an "Unlock Flag" on a Character or Profile.
These are individual bits of state that can be either set or not set, and sometimes provide interesting human-readable information in their related DestinyUnlockDefinition.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `unlockHash` | `integer(uint32)` | no | The hash identifier for the Unlock Flag. Use to lookup DestinyUnlockDefinition for static data. Not all unlocks have human readable data - in fact, most don't. But when they do, it can be very useful to show. Even if they don't have human readable data, you might be able to infer the meaning of an unlock flag with a bit of experimentation... |
| `isSet` | `boolean` | no | Whether the unlock flag is set. |

### Destiny.DestinyUnlockValueUIStyle

If you're showing an unlock value in the UI, this is the format in which it should be shown. You'll have to build your own algorithms on the client side to determine how best to render these options.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`

### Destiny.DestinyVendorFilter

Indicates the type of filter to apply to Vendor results.

Type: `integer enum`

Enum values:

- `0`
- `1`

### Destiny.DestinyVendorInteractionRewardSelection

When a Vendor Interaction provides rewards, they'll either let you choose one or let you have all of them. This determines which it will be.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyVendorItemRefundPolicy

The action that happens when the user attempts to refund an item.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyVendorItemState

The possible states of Destiny Profile Records. IMPORTANT: Any given item can theoretically have many of these states simultaneously: as a result, this was altered to be a flags enumeration/bitmask for v3.2.0.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`
- `128`
- `256`
- `512`
- `1024`
- `2048`
- `4096`
- `8192`
- `16384`
- `32768`
- `65536`
- `131072`
- `262144`
- `524288`
- `1048576`
- `2097152`
- `4194304`
- `8388608`
- `16777216`
- `33554432`

### Destiny.DestinyVendorProgressionType

Describes the type of progression that a vendor has.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DestinyVendorReplyType

This determines the type of reply that a Vendor will have during an Interaction.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.DyeReference

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `channelHash` | `integer(uint32)` | no |  |
| `dyeHash` | `integer(uint32)` | no |  |

### Destiny.Entities.Characters.DestinyCharacterActivitiesComponent

This component holds activity data for a character. It will tell you about the character's current activity status, as well as activities that are available to the user.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `dateActivityStarted` | `string(date-time)` | no | The last date that the user started playing an activity. |
| `availableActivities` | `Destiny.DestinyActivity[]` | no | The list of activities that the user can play. |
| `availableActivityInteractables` | `Destiny.Definitions.FireteamFinder.DestinyActivityInteractableReference[]` | no | The list of activity interactables that the player can interact with. |
| `difficultyTierCollections` | `object` | no | The activity difficulty tier states for this character. |
| `selectableSkullCollections` | `object` | no | The selectable activity skulls states for this character. |
| `currentActivityHash` | `integer(uint32)` | no | If the user is in an activity, this will be the hash of the Activity being played. Note that you must combine this info with currentActivityModeHash to get a real picture of what the user is doing right now. For instance, PVP "Activities" are just maps: it's the ActivityMode that determines what type of PVP game they're playing. |
| `currentActivityModeHash` | `integer(uint32)` | no | If the user is in an activity, this will be the hash of the activity mode being played. Combine with currentActivityHash to give a person a full picture of what they're doing right now. |
| `currentActivityModeType` | `integer(int32)` | no | And the current activity's most specific mode type, if it can be found. |
| `currentActivityModeHashes` | `integer(uint32)[]` | no | If the user is in an activity, this will be the hashes of the DestinyActivityModeDefinition being played. Combine with currentActivityHash to give a person a full picture of what they're doing right now. |
| `currentActivityModeTypes` | `integer(int32)[]` | no | All Activity Modes that apply to the current activity being played, in enum form. |
| `currentPlaylistActivityHash` | `integer(uint32)` | no | If the user is in a playlist, this is the hash identifier for the playlist that they chose. |
| `lastCompletedStoryHash` | `integer(uint32)` | no | This will have the activity hash of the last completed story/campaign mission, in case you care about that. |

### Destiny.Entities.Characters.DestinyCharacterComponent

This component contains base properties of the character. You'll probably want to always request this component, but hey you do you.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `membershipId` | `integer(int64)` | no | Every Destiny Profile has a membershipId. This is provided on the character as well for convenience. |
| `membershipType` | `integer(int32)` | no | membershipType tells you the platform on which the character plays. Examine the BungieMembershipType enumeration for possible values. |
| `characterId` | `integer(int64)` | no | The unique identifier for the character. |
| `dateLastPlayed` | `string(date-time)` | no | The last date that the user played Destiny. |
| `minutesPlayedThisSession` | `integer(int64)` | no | If the user is currently playing, this is how long they've been playing. |
| `minutesPlayedTotal` | `integer(int64)` | no | If this value is 525,600, then they played Destiny for a year. Or they're a very dedicated Rent fan. Note that this includes idle time, not just time spent actually in activities shooting things. |
| `light` | `integer(int32)` | no | The user's calculated "Light Level". Light level is an indicator of your power that mostly matters in the end game, once you've reached the maximum character level: it's a level that's dependent on the average Attack/Defense power of your items. |
| `stats` | `object` | no | Your character's stats, such as Agility, Resilience, etc... *not* historical stats.<br>You'll have to call a different endpoint for those. |
| `raceHash` | `integer(uint32)` | no | Use this hash to look up the character's DestinyRaceDefinition. |
| `genderHash` | `integer(uint32)` | no | Use this hash to look up the character's DestinyGenderDefinition. |
| `classHash` | `integer(uint32)` | no | Use this hash to look up the character's DestinyClassDefinition. |
| `raceType` | `integer(int32)` | no | Mostly for historical purposes at this point, this is an enumeration for the character's race.<br>It'll be preferable in the general case to look up the related definition: but for some people this was too convenient to remove. |
| `classType` | `integer(int32)` | no | Mostly for historical purposes at this point, this is an enumeration for the character's class.<br>It'll be preferable in the general case to look up the related definition: but for some people this was too convenient to remove. |
| `genderType` | `integer(int32)` | no | Mostly for historical purposes at this point, this is an enumeration for the character's Gender.<br>It'll be preferable in the general case to look up the related definition: but for some people this was too convenient to remove. And yeah, it's an enumeration and not a boolean. Fight me. |
| `emblemPath` | `string` | no | A shortcut path to the user's currently equipped emblem image. If you're just showing summary info for a user, this is more convenient than examining their equipped emblem and looking up the definition. |
| `emblemBackgroundPath` | `string` | no | A shortcut path to the user's currently equipped emblem background image. If you're just showing summary info for a user, this is more convenient than examining their equipped emblem and looking up the definition. |
| `emblemHash` | `integer(uint32)` | no | The hash of the currently equipped emblem for the user. Can be used to look up the DestinyInventoryItemDefinition. |
| `emblemColor` | `object` | no | A shortcut for getting the background color of the user's currently equipped emblem without having to do a DestinyInventoryItemDefinition lookup. |
| `levelProgression` | `object` | no | The progression that indicates your character's level. Not their light level, but their character level: you know, the thing you max out a couple hours in and then ignore for the sake of light level. |
| `baseCharacterLevel` | `integer(int32)` | no | The "base" level of your character, not accounting for any light level. |
| `percentToNextLevel` | `number(float)` | no | A number between 0 and 100, indicating the whole and fractional % remaining to get to the next character level. |
| `titleRecordHash` | `integer(uint32)` | no | If this Character has a title assigned to it, this is the identifier of the DestinyRecordDefinition that has that title information. |

### Destiny.Entities.Characters.DestinyCharacterProgressionComponent

This component returns anything that could be considered "Progression" on a user: data where the user is gaining levels, reputation, completions, rewards, etc...

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `progressions` | `object` | no | A Dictionary of all known progressions for the Character, keyed by the Progression's hash.<br>Not all progressions have user-facing data, but those who do will have that data contained in the DestinyProgressionDefinition. |
| `factions` | `object` | no | A dictionary of all known Factions, keyed by the Faction's hash. It contains data about this character's status with the faction. |
| `milestones` | `object` | no | Milestones are related to the simple progressions shown in the game, but return additional and hopefully helpful information for users about the specifics of the Milestone's status. |
| `quests` | `Destiny.Quests.DestinyQuestStatus[]` | no | If the user has any active quests, the quests' statuses will be returned here.<br> Note that quests have been largely supplanted by Milestones, but that doesn't mean that they won't make a comeback independent of milestones at some point.<br> (Fun fact: quests came back as I feared they would, but we never looped back to populate this... I'm going to put that in the backlog.) |
| `uninstancedItemObjectives` | `object` | no | Sometimes, you have items in your inventory that don't have instances, but still have Objective information. This provides you that objective information for uninstanced items. <br>This dictionary is keyed by the item's hash: which you can use to look up the name and description for the overall task(s) implied by the objective. The value is the list of objectives for this item, and their statuses. |
| `uninstancedItemPerks` | `object` | no | Sometimes, you have items in your inventory that don't have instances, but still have perks (for example: Trials passage cards). This gives you the perk information for uninstanced items.<br>This dictionary is keyed by item hash, which you can use to look up the corresponding item definition. The value is the list of perks states for the item. |
| `checklists` | `object` | no | The set of checklists that can be examined for this specific character, keyed by the hash identifier of the Checklist (DestinyChecklistDefinition)<br>For each checklist returned, its value is itself a Dictionary keyed by the checklist's hash identifier with the value being a boolean indicating if it's been discovered yet. |
| `seasonalArtifact` | `object` | no | Data related to your progress on the current season's artifact that can vary per character. |
| `unclaimedOrderRewards` | `object` | no | Unclaimed rewards earned by completing Orders. |

### Destiny.Entities.Characters.DestinyCharacterRenderComponent

Only really useful if you're attempting to render the character's current appearance in 3D, this returns a bare minimum of information, pre-aggregated, that you'll need to perform that rendering. Note that you need to combine this with other 3D assets and data from our servers.
Examine the Javascript returned by https://bungie.net/sharedbundle/spasm to see how we use this data, but be warned: the rabbit hole goes pretty deep.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `customDyes` | `Destiny.DyeReference[]` | no | Custom dyes, calculated by iterating over the character's equipped items. Useful for pre-fetching all of the dye data needed from our server. |
| `customization` | `object` | no | This is actually something that Spasm.js *doesn't* do right now, and that we don't return assets for yet. This is the data about what character customization options you picked. You can combine this with DestinyCharacterCustomizationOptionDefinition to show some cool info, and hopefully someday to actually render a user's face in 3D. We'll see if we ever end up with time for that. |
| `peerView` | `object` | no | A minimal view of:<br>- Equipped items<br>- The rendering-related custom options on those equipped items<br>Combined, that should be enough to render all of the items on the equipped character. |

### Destiny.Entities.Inventory.DestinyInventoryComponent

A list of minimal information for items in an inventory: be it a character's inventory, or a Profile's inventory. (Note that the Vault is a collection of inventory buckets in the Profile's inventory)
Inventory Items returned here are in a flat list, but importantly they have a bucketHash property that indicates the specific inventory bucket that is holding them. These buckets constitute things like the separate sections of the Vault, the user's inventory slots, etc. See DestinyInventoryBucketDefinition for more info.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `Destiny.Entities.Items.DestinyItemComponent[]` | no | The items in this inventory. If you care to bucket them, use the item's bucketHash property to group them. |

### Destiny.Entities.Items.DestinyItemComponent

The base item component, filled with properties that are generally useful to know in any item request or that don't feel worthwhile to put in their own component.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemHash` | `integer(uint32)` | no | The identifier for the item's definition, which is where most of the useful static information for the item can be found. |
| `itemInstanceId` | `integer(int64)` | no | If the item is instanced, it will have an instance ID. Lack of an instance ID implies that the item has no distinct local qualities aside from stack size. |
| `quantity` | `integer(int32)` | no | The quantity of the item in this stack. Note that Instanced items cannot stack. If an instanced item, this value will always be 1 (as the stack has exactly one item in it) |
| `bindStatus` | `integer(int32)` | no | If the item is bound to a location, it will be specified in this enum. |
| `location` | `integer(int32)` | no | An easy reference for where the item is located. Redundant if you got the item from an Inventory, but useful when making detail calls on specific items. |
| `bucketHash` | `integer(uint32)` | no | The hash identifier for the specific inventory bucket in which the item is located. |
| `transferStatus` | `integer(int32)` | no | If there is a known error state that would cause this item to not be transferable, this Flags enum will indicate all of those error states. Otherwise, it will be 0 (CanTransfer). |
| `lockable` | `boolean` | no | If the item can be locked, this will indicate that state. |
| `state` | `integer(int32)` | no | A flags enumeration indicating the transient/custom states of the item that affect how it is rendered: whether it's tracked or locked for example, or whether it has a masterwork plug inserted. |
| `overrideStyleItemHash` | `integer(uint32)` | no | If populated, this is the hash of the item whose icon (and other secondary styles, but *not* the human readable strings) should override whatever icons/styles are on the item being sold.<br>If you don't do this, certain items whose styles are being overridden by socketed items - such as the "Recycle Shader" item - would show whatever their default icon/style is, and it wouldn't be pretty or look accurate. |
| `expirationDate` | `string(date-time)` | no | If the item can expire, this is the date at which it will/did expire. |
| `isWrapper` | `boolean` | no | If this is true, the object is actually a "wrapper" of the object it's representing. This means that it's not the actual item itself, but rather an item that must be "opened" in game before you have and can use the item.<br> Wrappers are an evolution of "bundles", which give an easy way to let you preview the contents of what you purchased while still letting you get a refund before you "open" it. |
| `tooltipNotificationIndexes` | `integer(int32)[]` | no | If this is populated, it is a list of indexes into DestinyInventoryItemDefinition.tooltipNotifications for any special tooltip messages that need to be shown for this item. |
| `metricHash` | `integer(uint32)` | no | The identifier for the currently-selected metric definition, to be displayed on the emblem nameplate. |
| `metricObjective` | `object` | no | The objective progress for the currently-selected metric definition, to be displayed on the emblem nameplate. |
| `versionNumber` | `integer(int32)` | no | The version of this item, used to index into the versions list in the item definition quality block. |
| `itemValueVisibility` | `boolean[]` | no | If available, a list that describes which item values (rewards) should be shown (true) or hidden (false). |

### Destiny.Entities.Items.DestinyItemInstanceComponent

If an item is "instanced", this will contain information about the item's instance that doesn't fit easily into other components. One might say this is the "essential" instance data for the item.
Items are instanced if they require information or state that can vary. For instance, weapons are Instanced: they are given a unique identifier, uniquely generated stats, and can have their properties altered. Non-instanced items have none of these things: for instance, Glimmer has no unique properties aside from how much of it you own.
You can tell from an item's definition whether it will be instanced or not by looking at the DestinyInventoryItemDefinition's definition.inventory.isInstanceItem property.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `damageType` | `integer(int32)` | no | If the item has a damage type, this is the item's current damage type. |
| `damageTypeHash` | `integer(uint32)` | no | The current damage type's hash, so you can look up localized info and icons for it. |
| `primaryStat` | `object` | no | The item stat that we consider to be "primary" for the item. For instance, this would be "Attack" for Weapons or "Defense" for armor. |
| `itemLevel` | `integer(int32)` | no | The Item's "Level" has the most significant bearing on its stats, such as Light and Power. |
| `quality` | `integer(int32)` | no | The "Quality" of the item has a lesser - but still impactful - bearing on stats like Light and Power. |
| `isEquipped` | `boolean` | no | Is the item currently equipped on the given character? |
| `canEquip` | `boolean` | no | If this is an equippable item, you can check it here. There are permanent as well as transitory reasons why an item might not be able to be equipped: check cannotEquipReason for details. |
| `equipRequiredLevel` | `integer(int32)` | no | If the item cannot be equipped until you reach a certain level, that level will be reflected here. |
| `unlockHashesRequiredToEquip` | `integer(uint32)[]` | no | Sometimes, there are limitations to equipping that are represented by character-level flags called "unlocks".<br>This is a list of flags that they need in order to equip the item that the character has not met. Use these to look up the descriptions to show in your UI by looking up the relevant DestinyUnlockDefinitions for the hashes. |
| `cannotEquipReason` | `integer(int32)` | no | If you cannot equip the item, this is a flags enum that enumerates all of the reasons why you couldn't equip the item. You may need to refine your UI further by using unlockHashesRequiredToEquip and equipRequiredLevel. |
| `breakerType` | `integer(int32)` | no | If populated, this item has a breaker type corresponding to the given value. See DestinyBreakerTypeDefinition for more details. |
| `breakerTypeHash` | `integer(uint32)` | no | If populated, this is the hash identifier for the item's breaker type. See DestinyBreakerTypeDefinition for more details. |
| `energy` | `object` | no | IF populated, this item supports Energy mechanics (i.e. Armor 2.0), and these are the current details of its energy type and available capacity to spend energy points. |
| `gearTier` | `integer(int32)` | no | Gear Tier, if applicable, fished up from the unlock value items.gear_tier |

### Destiny.Entities.Items.DestinyItemInstanceEnergy

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `energyTypeHash` | `integer(uint32)` | no | The type of energy for this item. Plugs that require Energy can only be inserted if they have the "Any" Energy Type or the matching energy type of this item. This is a reference to the DestinyEnergyTypeDefinition for the energy type, where you can find extended info about it. |
| `energyType` | `integer(int32)` | no | This is the enum version of the Energy Type value, for convenience. |
| `energyCapacity` | `integer(int32)` | no | The total capacity of Energy that the item currently has, regardless of if it is currently being used. |
| `energyUsed` | `integer(int32)` | no | The amount of Energy currently in use by inserted plugs. |
| `energyUnused` | `integer(int32)` | no | The amount of energy still available for inserting new plugs. |

### Destiny.Entities.Items.DestinyItemObjectivesComponent

Items can have objectives and progression. When you request this block, you will obtain information about any Objectives and progression tied to this item.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `objectives` | `Destiny.Quests.DestinyObjectiveProgress[]` | no | If the item has a hard association with objectives, your progress on them will be defined here. <br>Objectives are our standard way to describe a series of tasks that have to be completed for a reward. |
| `flavorObjective` | `object` | no | I may regret naming it this way - but this represents when an item has an objective that doesn't serve a beneficial purpose, but rather is used for "flavor" or additional information. For instance, when Emblems track specific stats, those stats are represented as Objectives on the item. |
| `dateCompleted` | `string(date-time)` | no | If we have any information on when these objectives were completed, this will be the date of that completion. This won't be on many items, but could be interesting for some items that do store this information. |

### Destiny.Entities.Items.DestinyItemPerksComponent

Instanced items can have perks: benefits that the item bestows.
These are related to DestinySandboxPerkDefinition, and sometimes - but not always - have human readable info. When they do, they are the icons and text that you see in an item's tooltip.
Talent Grids, Sockets, and the item itself can apply Perks, which are then summarized here for your convenience.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `perks` | `Destiny.Perks.DestinyPerkReference[]` | no | The list of perks to display in an item tooltip - and whether or not they have been activated. |

### Destiny.Entities.Items.DestinyItemRenderComponent

Many items can be rendered in 3D. When you request this block, you will obtain the custom data needed to render this specific instance of the item.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `useCustomDyes` | `boolean` | no | If you should use custom dyes on this item, it will be indicated here. |
| `artRegions` | `object` | no | A dictionary for rendering gear components, with:<br>key = Art Arrangement Region Index<br>value = The chosen Arrangement Index for the Region, based on the value of a stat on the item used for making the choice. |

### Destiny.Entities.Items.DestinyItemSocketsComponent

Instanced items can have sockets, which are slots on the item where plugs can be inserted.
Sockets are a bit complex: be sure to examine the documentation on the DestinyInventoryItemDefinition's "socket" block and elsewhere on these objects for more details.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `sockets` | `Destiny.Entities.Items.DestinyItemSocketState[]` | no | The list of all sockets on the item, and their status information. |

### Destiny.Entities.Items.DestinyItemSocketState

The status of a given item's socket. (which plug is inserted, if any: whether it is enabled, what "reusable" plugs can be inserted, etc...)
If I had it to do over, this would probably have a DestinyItemPlug representing the inserted item instead of most of these properties. :shrug:

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `plugHash` | `integer(uint32)` | no | The currently active plug, if any.<br>Note that, because all plugs are statically defined, its effect on stats and perks can be statically determined using the plug item's definition. The stats and perks can be taken at face value on the plug item as the stats and perks it will provide to the user/item. |
| `isEnabled` | `boolean` | no | Even if a plug is inserted, it doesn't mean it's enabled.<br>This flag indicates whether the plug is active and providing its benefits. |
| `isVisible` | `boolean` | no | A plug may theoretically provide benefits but not be visible - for instance, some older items use a plug's damage type perk to modify their own damage type. These, though they are not visible, still affect the item. This field indicates that state.<br>An invisible plug, while it provides benefits if it is Enabled, cannot be directly modified by the user. |
| `enableFailIndexes` | `integer(int32)[]` | no | If a plug is inserted but not enabled, this will be populated with indexes into the plug item definition's plug.enabledRules property, so that you can show the reasons why it is not enabled. |

### Destiny.Entities.Items.DestinyItemStatsComponent

If you want the stats on an item's instanced data, get this component.
These are stats like Attack, Defense etc... and *not* historical stats.
Note that some stats have additional computation in-game at runtime - for instance, Magazine Size - and thus these stats might not be 100% accurate compared to what you see in-game for some stats. I know, it sucks. I hate it too.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `stats` | `object` | no | If the item has stats that it provides (damage, defense, etc...), it will be given here. |

### Destiny.Entities.Items.DestinyItemTalentGridComponent

Well, we're here in Destiny 2, and Talent Grids are unfortunately still around.
The good news is that they're pretty much only being used for certain base information on items and for Builds/Subclasses. The bad news is that they still suck. If you really want this information, grab this component.
An important note is that talent grids are defined as such:
A Grid has 1:M Nodes, which has 1:M Steps.
Any given node can only have a single step active at one time, which represents the actual visual contents and effects of the Node (for instance, if you see a "Super Cool Bonus" node, the actual icon and text for the node is coming from the current Step of that node).
Nodes can be grouped into exclusivity sets *and* as of D2, exclusivity groups (which are collections of exclusivity sets that affect each other).
See DestinyTalentGridDefinition for more information. Brace yourself, the water's cold out there in the deep end.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `talentGridHash` | `integer(uint32)` | no | Most items don't have useful talent grids anymore, but Builds in particular still do.<br>You can use this hash to lookup the DestinyTalentGridDefinition attached to this item, which will be crucial for understanding the node values on the item. |
| `nodes` | `Destiny.DestinyTalentNode[]` | no | Detailed information about the individual nodes in the talent grid.<br>A node represents a single visual "pip" in the talent grid or Build detail view, though each node may have multiple "steps" which indicate the actual bonuses and visual representation of that node. |
| `isGridComplete` | `boolean` | no | Indicates whether the talent grid on this item is completed, and thus whether it should have a gold border around it.<br>Only will be true if the item actually *has* a talent grid, and only then if it is completed (i.e. every exclusive set has an activated node, and every non-exclusive set node has been activated) |
| `gridProgression` | `object` | no | If the item has a progression, it will be detailed here. A progression means that the item can gain experience. Thresholds of experience are what determines whether and when a talent node can be activated. |

### Destiny.Entities.Profiles.DestinyProfileComponent

The most essential summary information about a Profile (in Destiny 1, we called these "Accounts").

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `userInfo` | `object` | no | If you need to render the Profile (their platform name, icon, etc...) somewhere, this property contains that information. |
| `dateLastPlayed` | `string(date-time)` | no | The last time the user played with any character on this Profile. |
| `versionsOwned` | `integer(int32)` | no | If you want to know what expansions they own, this will contain that data.<br> IMPORTANT: This field may not return the data you're interested in for Cross-Saved users. It returns the last ownership data we saw for this account - which is to say, what they've purchased on the platform on which they last played, which now could be a different platform.<br> If you don't care about per-platform ownership and only care about whatever platform it seems they are playing on most recently, then this should be "good enough." Otherwise, this should be considered deprecated. We do not have a good alternative to provide at this time with platform specific ownership data for DLC. |
| `characterIds` | `integer(int64)[]` | no | A list of the character IDs, for further querying on your part. |
| `seasonHashes` | `integer(uint32)[]` | no | A list of seasons that this profile owns. Unlike versionsOwned, these stay with the profile across Platforms, and thus will be valid.<br> It turns out that Stadia Pro subscriptions will give access to seasons but only while playing on Stadia and with an active subscription. So some users (users who have Stadia Pro but choose to play on some other platform) won't see these as available: it will be whatever seasons are available for the platform on which they last played. |
| `seasonPassHashes` | `integer(uint32)[]` | no | A list of season passes aka reward passes that this profile owns. Unlike versionsOwned, these stay with the profile across Platforms, and thus will be valid. |
| `eventCardHashesOwned` | `integer(uint32)[]` | no | A list of hashes for event cards that a profile owns. Unlike most values in versionsOwned, these stay with the profile across all platforms. |
| `currentSeasonHash` | `integer(uint32)` | no | If populated, this is a reference to the season that is currently active. |
| `currentSeasonPassHash` | `integer(uint32)` | no | If populated, this is a reference to the season pass that is currently active. |
| `currentSeasonRewardPowerCap` | `integer(int32)` | no | If populated, this is the reward power cap for the current season. |
| `activeEventCardHash` | `integer(uint32)` | no | If populated, this is a reference to the event card that is currently active. |
| `currentGuardianRank` | `integer(int32)` | no | The 'current' Guardian Rank value, which starts at rank 1. This rank value will drop at the start of a new season to your 'renewed' rank from the previous season. |
| `lifetimeHighestGuardianRank` | `integer(int32)` | no | The 'lifetime highest' Guardian Rank value, which starts at rank 1. This rank value should never go down. |
| `renewedGuardianRank` | `integer(int32)` | no | The seasonal 'renewed' Guardian Rank value. This rank value resets at the start of each new season to the highest-earned non-advanced rank. |

### Destiny.Entities.Profiles.DestinyVendorReceiptsComponent

For now, this isn't used for much: it's a record of the recent refundable purchases that the user has made. In the future, it could be used for providing refunds/buyback via the API. Wouldn't that be fun?

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `receipts` | `Destiny.Vendors.DestinyVendorReceipt[]` | no | The receipts for refundable purchases made at a vendor. |

### Destiny.Entities.Vendors.DestinyVendorCategoriesComponent

A vendor can have many categories of items that they sell. This component will return the category information for available items, as well as the index into those items in the user's sale item list.
Note that, since both the category and items are indexes, this data is Content Version dependent. Be sure to check that your content is up to date before using this data. This is an unfortunate, but permanent, limitation of Vendor data.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `categories` | `Destiny.Entities.Vendors.DestinyVendorCategory[]` | no | The list of categories for items that the vendor sells, in rendering order.<br>These categories each point to a "display category" in the displayCategories property of the DestinyVendorDefinition, as opposed to the other categories. |

### Destiny.Entities.Vendors.DestinyVendorCategory

Information about the category and items currently sold in that category.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayCategoryIndex` | `integer(int32)` | no | An index into the DestinyVendorDefinition.displayCategories property, so you can grab the display data for this category. |
| `itemIndexes` | `integer(int32)[]` | no | An ordered list of indexes into items being sold in this category (DestinyVendorDefinition.itemList) which will contain more information about the items being sold themselves. Can also be used to index into DestinyVendorSaleItemComponent data, if you asked for that data to be returned. |

### Destiny.Entities.Vendors.DestinyVendorComponent

This component contains essential/summary information about the vendor.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `canPurchase` | `boolean` | no | If True, you can purchase from the Vendor. |
| `progression` | `object` | no | If the Vendor has a related Reputation, this is the Progression data that represents the character's Reputation level with this Vendor. |
| `vendorLocationIndex` | `integer(int32)` | no | An index into the vendor definition's "locations" property array, indicating which location they are at currently. If -1, then the vendor has no known location (and you may choose not to show them in your UI as a result. I mean, it's your bag honey) |
| `seasonalRank` | `integer(int32)` | no | If this vendor has a seasonal rank, this will be the calculated value of that rank. How nice is that? I mean, that's pretty sweeet. It's a whole 32 bit integer. |
| `vendorHash` | `integer(uint32)` | no | The unique identifier for the vendor. Use it to look up their DestinyVendorDefinition. |
| `nextRefreshDate` | `string(date-time)` | no | The date when this vendor's inventory will next rotate/refresh.<br>Note that this is distinct from the date ranges that the vendor is visible/available in-game: this field indicates the specific time when the vendor's available items refresh and rotate, regardless of whether the vendor is actually available at that time. Unfortunately, these two values may be (and are, for the case of important vendors like Xur) different.<br>Issue https://github.com/Bungie-net/api/issues/353 is tracking a fix to start providing visibility date ranges where possible in addition to this refresh date, so that all important dates for vendors are available for use. |
| `enabled` | `boolean` | no | If True, the Vendor is currently accessible. <br>If False, they may not actually be visible in the world at the moment. |

### Destiny.Entities.Vendors.DestinyVendorSaleItemComponent

Request this component if you want the details about an item being sold in relation to the character making the request: whether the character can buy it, whether they can afford it, and other data related to purchasing the item.
Note that if you want instance, stats, etc... data for the item, you'll have to request additional components such as ItemInstances, ItemPerks etc... and acquire them from the DestinyVendorResponse's "items" property.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `saleStatus` | `integer(int32)` | no | A flag indicating whether the requesting character can buy the item, and if not the reasons why the character can't buy it. |
| `requiredUnlocks` | `integer(uint32)[]` | no | If you can't buy the item due to a complex character state, these will be hashes for DestinyUnlockDefinitions that you can check to see messages regarding the failure (if the unlocks have human readable information: it is not guaranteed that Unlocks will have human readable strings, and your application will have to handle that)<br>Prefer using failureIndexes instead. These are provided for informational purposes, but have largely been supplanted by failureIndexes. |
| `unlockStatuses` | `Destiny.DestinyUnlockStatus[]` | no | If any complex unlock states are checked in determining purchasability, these will be returned here along with the status of the unlock check.<br>Prefer using failureIndexes instead. These are provided for informational purposes, but have largely been supplanted by failureIndexes. |
| `failureIndexes` | `integer(int32)[]` | no | Indexes in to the "failureStrings" lookup table in DestinyVendorDefinition for the given Vendor. Gives some more reliable failure information for why you can't purchase an item.<br>It is preferred to use these over requiredUnlocks and unlockStatuses: the latter are provided mostly in case someone can do something interesting with it that I didn't anticipate. |
| `augments` | `integer(int32)` | no | A flags enumeration value representing the current state of any "state modifiers" on the item being sold. These are meant to correspond with some sort of visual indicator as to the augmentation: for instance, if an item is on sale or if you already own the item in question.<br>Determining how you want to represent these in your own app (or if you even want to) is an exercise left for the reader. |
| `itemValueVisibility` | `boolean[]` | no | If available, a list that describes which item values (rewards) should be shown (true) or hidden (false). |
| `vendorItemIndex` | `integer(int32)` | no | The index into the DestinyVendorDefinition.itemList property. Note that this means Vendor data *is* Content Version dependent: make sure you have the latest content before you use Vendor data, or these indexes may mismatch. <br>Most systems avoid this problem, but Vendors is one area where we are unable to reasonably avoid content dependency at the moment. |
| `itemHash` | `integer(uint32)` | no | The hash of the item being sold, as a quick shortcut for looking up the DestinyInventoryItemDefinition of the sale item. |
| `overrideStyleItemHash` | `integer(uint32)` | no | If populated, this is the hash of the item whose icon (and other secondary styles, but *not* the human readable strings) should override whatever icons/styles are on the item being sold.<br>If you don't do this, certain items whose styles are being overridden by socketed items - such as the "Recycle Shader" item - would show whatever their default icon/style is, and it wouldn't be pretty or look accurate. |
| `quantity` | `integer(int32)` | no | How much of the item you'll be getting. |
| `costs` | `Destiny.DestinyItemQuantity[]` | no | A summary of the current costs of the item. |
| `overrideNextRefreshDate` | `string(date-time)` | no | If this item has its own custom date where it may be removed from the Vendor's rotation, this is that date.<br>Note that there's not actually any guarantee that it will go away: it could be chosen again and end up still being in the Vendor's sale items! But this is the next date where that test will occur, and is also the date that the game shows for availability on things like Bounties being sold. So it's the best we can give. |
| `apiPurchasable` | `boolean` | no | If true, this item can be purchased through the Bungie.net API. |

### Destiny.EquipFailureReason

The reasons why an item cannot be equipped, if any. Many flags can be set, or "None" if

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`
- `128`

### Destiny.EquippingItemBlockAttributes

Type: `integer enum`

Enum values:

- `0`
- `1`

### Destiny.FireteamFinderCodeOptionType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`

### Destiny.FireteamFinderLabelFieldType

Type: `integer enum`

Enum values:

- `0`
- `1`

### Destiny.FireteamFinderOptionAvailability

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`

### Destiny.FireteamFinderOptionControlType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.FireteamFinderOptionDisplayFormat

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.FireteamFinderOptionSearchFilterType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`

### Destiny.FireteamFinderOptionValueFlags

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.FireteamFinderOptionValueProviderType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`

### Destiny.FireteamFinderOptionVisibility

Type: `integer enum`

Enum values:

- `0`
- `1`

### Destiny.HistoricalStats.Definitions.DestinyActivityModeType

For historical reasons, this list will have both D1 and D2-relevant Activity Modes in it. Please don't take this to mean that some D1-only feature is coming back!

Type: `integer enum`

Enum values:

- `0`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `9`
- `10`
- `11`
- `12`
- `13`
- `15`
- `16`
- `17`
- `18`
- `19`
- `20`
- `21`
- `22`
- `24`
- `25`
- `26`
- `27`
- `28`
- `29`
- `30`
- `31`
- `32`
- `37`
- `38`
- `39`
- `40`
- `41`
- `42`
- `43`
- `44`
- `45`
- `46`
- `47`
- `48`
- `49`
- `50`
- `51`
- `52`
- `53`
- `54`
- `55`
- `56`
- `57`
- `58`
- `59`
- `60`
- `61`
- `62`
- `63`
- `64`
- `65`
- `66`
- `67`
- `68`
- `69`
- `70`
- `71`
- `72`
- `73`
- `74`
- `75`
- `76`
- `77`
- `78`
- `79`
- `80`
- `81`
- `82`
- `83`
- `84`
- `85`
- `86`
- `87`
- `88`
- `89`
- `90`
- `91`
- `92`
- `93`

### Destiny.HistoricalStats.Definitions.DestinyActivityModeType[]

Type: `integer(int32)[]`

### Destiny.HistoricalStats.Definitions.DestinyHistoricalStatsDefinition

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `statId` | `string` | no | Unique programmer friendly ID for this stat |
| `group` | `integer(int32)` | no | Statistic group |
| `periodTypes` | `integer(int32)[]` | no | Time periods the statistic covers |
| `modes` | `integer(int32)[]` | no | Game modes where this statistic can be reported. |
| `category` | `integer(int32)` | no | Category for the stat. |
| `statName` | `string` | no | Display name |
| `statNameAbbr` | `string` | no | Display name abbreviated |
| `statDescription` | `string` | no | Description of a stat if applicable. |
| `unitType` | `integer(int32)` | no | Unit, if any, for the statistic |
| `iconImage` | `string` | no | Optional URI to an icon for the statistic |
| `mergeMethod` | `integer(int32)` | no | Optional icon for the statistic |
| `unitLabel` | `string` | no | Localized Unit Name for the stat. |
| `weight` | `integer(int32)` | no | Weight assigned to this stat indicating its relative impressiveness. |
| `medalTierHash` | `integer(uint32)` | no | The tier associated with this medal - be it implicitly or explicitly. |

### Destiny.HistoricalStats.Definitions.DestinyStatsCategoryType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`
- `15`

### Destiny.HistoricalStats.Definitions.DestinyStatsGroupType

If the enum value is > 100, it is a "special" group that cannot be queried for directly (special cases apply to when they are returned, and are not relevant in general cases)

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `100`
- `101`
- `102`
- `103`
- `104`

### Destiny.HistoricalStats.Definitions.DestinyStatsMergeMethod

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.HistoricalStats.Definitions.PeriodType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.HistoricalStats.Definitions.PeriodType[]

Type: `integer(int32)[]`

### Destiny.HistoricalStats.Definitions.UnitType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`

### Destiny.HistoricalStats.DestinyActivityHistoryResults

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activities` | `Destiny.HistoricalStats.DestinyHistoricalStatsPeriodGroup[]` | no | List of activities, the most recent activity first. |

### Destiny.HistoricalStats.DestinyAggregateActivityResults

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activities` | `Destiny.HistoricalStats.DestinyAggregateActivityStats[]` | no | List of all activities the player has participated in. |

### Destiny.HistoricalStats.DestinyAggregateActivityStats

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no | Hash ID that can be looked up in the DestinyActivityTable. |
| `values` | `object` | no | Collection of stats for the player in this activity. |

### Destiny.HistoricalStats.DestinyClanAggregateStat

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `mode` | `integer(int32)` | no | The id of the mode of stats (allPvp, allPvE, etc) |
| `statId` | `string` | no | The id of the stat |
| `value` | `object` | no | Value of the stat for this player |

### Destiny.HistoricalStats.DestinyHistoricalStatsAccountResult

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `mergedDeletedCharacters` | `Destiny.HistoricalStats.DestinyHistoricalStatsWithMerged` | no |  |
| `mergedAllCharacters` | `Destiny.HistoricalStats.DestinyHistoricalStatsWithMerged` | no |  |
| `characters` | `Destiny.HistoricalStats.DestinyHistoricalStatsPerCharacter[]` | no |  |

### Destiny.HistoricalStats.DestinyHistoricalStatsActivity

Summary information about the activity that was played.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `referenceId` | `integer(uint32)` | no | The unique hash identifier of the DestinyActivityDefinition that was played. If I had this to do over, it'd be named activityHash. Too late now. |
| `directorActivityHash` | `integer(uint32)` | no | The unique hash identifier of the DestinyActivityDefinition that was played. |
| `instanceId` | `integer(int64)` | no | The unique identifier for this *specific* match that was played.<br>This value can be used to get additional data about this activity such as who else was playing via the GetPostGameCarnageReport endpoint. |
| `mode` | `integer(int32)` | no | Indicates the most specific game mode of the activity that we could find. |
| `modes` | `integer(int32)[]` | no | The list of all Activity Modes to which this activity applies, including aggregates. This will let you see, for example, whether the activity was both Clash and part of the Trials of the Nine event. |
| `isPrivate` | `boolean` | no | Whether or not the match was a private match. |
| `membershipType` | `integer(int32)` | no | The Membership Type indicating the platform on which this match was played. |

### Destiny.HistoricalStats.DestinyHistoricalStatsByPeriod

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `allTime` | `object` | no |  |
| `allTimeTier1` | `object` | no |  |
| `allTimeTier2` | `object` | no |  |
| `allTimeTier3` | `object` | no |  |
| `daily` | `Destiny.HistoricalStats.DestinyHistoricalStatsPeriodGroup[]` | no |  |
| `monthly` | `Destiny.HistoricalStats.DestinyHistoricalStatsPeriodGroup[]` | no |  |

### Destiny.HistoricalStats.DestinyHistoricalStatsPerCharacter

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `characterId` | `integer(int64)` | no |  |
| `deleted` | `boolean` | no |  |
| `results` | `object` | no |  |
| `merged` | `Destiny.HistoricalStats.DestinyHistoricalStatsByPeriod` | no |  |

### Destiny.HistoricalStats.DestinyHistoricalStatsPeriodGroup

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `period` | `string(date-time)` | no | Period for the group. If the stat periodType is day, then this will have a specific day. If the type is monthly, then this value will be the first day of the applicable month. This value is not set when the periodType is 'all time'. |
| `activityDetails` | `object` | no | If the period group is for a specific activity, this property will be set. |
| `values` | `object` | no | Collection of stats for the period. |

### Destiny.HistoricalStats.DestinyHistoricalStatsResults

Type: `object`

### Destiny.HistoricalStats.DestinyHistoricalStatsValue

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `statId` | `string` | no | Unique ID for this stat |
| `basic` | `object` | no | Basic stat value. |
| `pga` | `object` | no | Per game average for the statistic, if applicable |
| `weighted` | `object` | no | Weighted value of the stat if a weight greater than 1 has been assigned. |
| `activityId` | `integer(int64)` | no | When a stat represents the best, most, longest, fastest or some other personal best, the actual activity ID where that personal best was established is available on this property. |

### Destiny.HistoricalStats.DestinyHistoricalStatsValuePair

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | `number(double)` | no | Raw value of the statistic |
| `displayValue` | `string` | no | Localized formated version of the value. |

### Destiny.HistoricalStats.DestinyHistoricalStatsWithMerged

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `object` | no |  |
| `merged` | `Destiny.HistoricalStats.DestinyHistoricalStatsByPeriod` | no |  |

### Destiny.HistoricalStats.DestinyHistoricalWeaponStats

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `referenceId` | `integer(uint32)` | no | The hash ID of the item definition that describes the weapon. |
| `values` | `object` | no | Collection of stats for the period. |

### Destiny.HistoricalStats.DestinyHistoricalWeaponStatsData

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `weapons` | `Destiny.HistoricalStats.DestinyHistoricalWeaponStats[]` | no | List of weapons and their perspective values. |

### Destiny.HistoricalStats.DestinyLeaderboard

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `statId` | `string` | no |  |
| `entries` | `Destiny.HistoricalStats.DestinyLeaderboardEntry[]` | no |  |

### Destiny.HistoricalStats.DestinyLeaderboardEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `rank` | `integer(int32)` | no | Where this player ranks on the leaderboard. A value of 1 is the top rank. |
| `player` | `object` | no | Identity details of the player |
| `characterId` | `integer(int64)` | no | ID of the player's best character for the reported stat. |
| `value` | `object` | no | Value of the stat for this player |

### Destiny.HistoricalStats.DestinyLeaderboardResults

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `focusMembershipId` | `integer(int64)` | no | Indicate the membership ID of the account that is the focal point of the provided leaderboards. |
| `focusCharacterId` | `integer(int64)` | no | Indicate the character ID of the character that is the focal point of the provided leaderboards. May be null, in which case any character from the focus membership can appear in the provided leaderboards. |

### Destiny.HistoricalStats.DestinyPlayer

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `destinyUserInfo` | `object` | no | Details about the player as they are known in game (platform display name, Destiny emblem) |
| `characterClass` | `string` | no | Class of the character if applicable and available. |
| `classHash` | `integer(uint32)` | no |  |
| `raceHash` | `integer(uint32)` | no |  |
| `genderHash` | `integer(uint32)` | no |  |
| `characterLevel` | `integer(int32)` | no | Level of the character if available. Zero if it is not available. |
| `lightLevel` | `integer(int32)` | no | Light Level of the character if available. Zero if it is not available. |
| `bungieNetUserInfo` | `object` | no | Details about the player as they are known on BungieNet. This will be undefined if the player has marked their credential private, or does not have a BungieNet account. |
| `clanName` | `string` | no | Current clan name for the player. This value may be null or an empty string if the user does not have a clan. |
| `clanTag` | `string` | no | Current clan tag for the player. This value may be null or an empty string if the user does not have a clan. |
| `emblemHash` | `integer(uint32)` | no | If we know the emblem's hash, this can be used to look up the player's emblem at the time of a match when receiving PGCR data, or otherwise their currently equipped emblem (if we are able to obtain it). |

### Destiny.HistoricalStats.DestinyPostGameCarnageReportData

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `period` | `string(date-time)` | no | Date and time for the activity. |
| `startingPhaseIndex` | `integer(int32)` | no | If this activity has "phases", this is the phase at which the activity was started. This value is only valid for activities before the Beyond Light expansion shipped. Subsequent activities will not have a valid value here. |
| `activityWasStartedFromBeginning` | `boolean` | no | True if the activity was started from the beginning, if that information is available and the activity was played post Witch Queen release. |
| `activityDifficultyTier` | `integer(int32)` | no | Difficulty tier index value for the activity. |
| `selectedSkullHashes` | `integer(uint32)[]` | no | Collection of player-selected skull hashes active for the activity. |
| `activityDetails` | `object` | no | Details about the activity. |
| `entries` | `Destiny.HistoricalStats.DestinyPostGameCarnageReportEntry[]` | no | Collection of players and their data for this activity. |
| `teams` | `Destiny.HistoricalStats.DestinyPostGameCarnageReportTeamEntry[]` | no | Collection of stats for the player in this activity. |

### Destiny.HistoricalStats.DestinyPostGameCarnageReportEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `standing` | `integer(int32)` | no | Standing of the player |
| `score` | `object` | no | Score of the player if available |
| `player` | `object` | no | Identity details of the player |
| `characterId` | `integer(int64)` | no | ID of the player's character used in the activity. |
| `values` | `object` | no | Collection of stats for the player in this activity. |
| `extended` | `object` | no | Extended data extracted from the activity blob. |

### Destiny.HistoricalStats.DestinyPostGameCarnageReportExtendedData

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `weapons` | `Destiny.HistoricalStats.DestinyHistoricalWeaponStats[]` | no | List of weapons and their perspective values. |
| `values` | `object` | no | Collection of stats for the player in this activity. |
| `scoreboardValues` | `object` | no | Collection of stats from the player scoreboard in this activity. |

### Destiny.HistoricalStats.DestinyPostGameCarnageReportTeamEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `teamId` | `integer(int32)` | no | Integer ID for the team. |
| `standing` | `object` | no | Team's standing relative to other teams. |
| `score` | `object` | no | Score earned by the team |
| `teamName` | `string` | no | Alpha or Bravo |

### Destiny.ItemBindStatus

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Destiny.ItemLocation

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Destiny.ItemPerkVisibility

Indicates how a perk should be shown, or if it should be, in the game UI. Maybe useful for those of you trying to filter out internal-use-only perks (or for those of you trying to figure out what they do!)

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.ItemState

A flags enumeration/bitmask where each bit represents a different possible state that the item can be in that may effect how the item is displayed to the user and what actions can be performed against it.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`

### Destiny.Milestones.DestinyMilestone

Represents a runtime instance of a user's milestone status. Live Milestone data should be combined with DestinyMilestoneDefinition data to show the user a picture of what is available for them to do in the game, and their status in regards to said "things to do." Consider it a big, wonky to-do list, or Advisors 3.0 for those who remember the Destiny 1 API.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `milestoneHash` | `integer(uint32)` | no | The unique identifier for the Milestone. Use it to look up the DestinyMilestoneDefinition, so you can combine the other data in this contract with static definition data. |
| `availableQuests` | `Destiny.Milestones.DestinyMilestoneQuest[]` | no | Indicates what quests are available for this Milestone. Usually this will be only a single Quest, but some quests have multiple available that you can choose from at any given time. All possible quests for a milestone can be found in the DestinyMilestoneDefinition, but they must be combined with this Live data to determine which one(s) are actually active right now. It is possible for Milestones to not have any quests. |
| `activities` | `Destiny.Milestones.DestinyMilestoneChallengeActivity[]` | no | The currently active Activities in this milestone, when the Milestone is driven by Challenges.<br>Not all Milestones have Challenges, but when they do this will indicate the Activities and Challenges under those Activities related to this Milestone. |
| `values` | `object` | no | Milestones may have arbitrary key/value pairs associated with them, for data that users will want to know about but that doesn't fit neatly into any of the common components such as Quests. A good example of this would be - if this existed in Destiny 1 - the number of wins you currently have on your Trials of Osiris ticket. Looking in the DestinyMilestoneDefinition, you can use the string identifier of this dictionary to look up more info about the value, including localized string content for displaying the value. The value in the dictionary is the floating point number. The definition will tell you how to format this number. |
| `vendorHashes` | `integer(uint32)[]` | no | A milestone may have one or more active vendors that are "related" to it (that provide rewards, or that are the initiators of the Milestone). I already regret this, even as I'm typing it. [I told you I'd regret this] You see, sometimes a milestone may be directly correlated with a set of vendors that provide varying tiers of rewards. The player may not be able to interact with one or more of those vendors. This will return the hashes of the Vendors that the player *can* interact with, allowing you to show their current inventory as rewards or related items to the Milestone or its activities.<br>Before we even use it, it's already deprecated! How much of a bummer is that? We need more data. |
| `vendors` | `Destiny.Milestones.DestinyMilestoneVendor[]` | no | Replaces vendorHashes, which I knew was going to be trouble the day it walked in the door. This will return not only what Vendors are active and relevant to the activity (in an implied order that you can choose to ignore), but also other data - for example, if the Vendor is featuring a specific item relevant to this event that you should show with them. |
| `rewards` | `Destiny.Milestones.DestinyMilestoneRewardCategory[]` | no | If the entity to which this component is attached has known active Rewards for the player, this will detail information about those rewards, keyed by the RewardEntry Hash. (See DestinyMilestoneDefinition for more information about Reward Entries) Note that these rewards are not for the Quests related to the Milestone. Think of these as "overview/checklist" rewards that may be provided for Milestones that may provide rewards for performing a variety of tasks that aren't under a specific Quest. |
| `startDate` | `string(date-time)` | no | If known, this is the date when the event last began or refreshed. It will only be populated for events with fixed and repeating start and end dates. |
| `endDate` | `string(date-time)` | no | If known, this is the date when the event will next end or repeat. It will only be populated for events with fixed and repeating start and end dates. |
| `order` | `integer(int32)` | no | Used for ordering milestones in a display to match how we order them in BNet. May pull from static data, or possibly in the future from dynamic information. |

### Destiny.Milestones.DestinyMilestoneActivity

Sometimes, we know the specific activity that the Milestone wants you to play. This entity provides additional information about that Activity and all of its variants. (sometimes there's only one variant, but I think you get the point)

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no | The hash of an arbitrarily chosen variant of this activity. We'll go ahead and call that the "canonical" activity, because if you're using this value you should only use it for properties that are common across the variants: things like the name of the activity, it's location, etc... Use this hash to look up the DestinyActivityDefinition of this activity for rendering data. |
| `activityModeHash` | `integer(uint32)` | no | The hash identifier of the most specific Activity Mode under which this activity is played. This is useful for situations where the activity in question is - for instance - a PVP map, but it's not clear what mode the PVP map is being played under. If it's a playlist, this will be less specific: but hopefully useful in some way. |
| `activityModeType` | `integer(int32)` | no | The enumeration equivalent of the most specific Activity Mode under which this activity is played. |
| `modifierHashes` | `integer(uint32)[]` | no | If the activity has modifiers, this will be the list of modifiers that all variants have in common. Perform lookups against DestinyActivityModifierDefinition which defines the modifier being applied to get at the modifier data. Note that, in the DestinyActivityDefinition, you will see many more modifiers than this being referred to: those are all *possible* modifiers for the activity, not the active ones. Use only the active ones to match what's really live. |
| `variants` | `Destiny.Milestones.DestinyMilestoneActivityVariant[]` | no | If you want more than just name/location/etc... you're going to have to dig into and show the variants of the conceptual activity. These will differ in seemingly arbitrary ways, like difficulty level and modifiers applied. Show it in whatever way tickles your fancy. |

### Destiny.Milestones.DestinyMilestoneActivityCompletionStatus

Represents this player's personal completion status for the Activity under a Milestone, if the activity has trackable completion and progress information. (most activities won't, or the concept won't apply. For instance, it makes sense to talk about a tier of a raid as being Completed or having progress, but it doesn't make sense to talk about a Crucible Playlist in those terms.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `completed` | `boolean` | no | If the activity has been "completed", that information will be returned here. |
| `phases` | `Destiny.Milestones.DestinyMilestoneActivityPhase[]` | no | If the Activity has discrete "phases" that we can track, that info will be here. Otherwise, this value will be NULL. Note that this is a list and not a dictionary: the order implies the ascending order of phases or progression in this activity. |

### Destiny.Milestones.DestinyMilestoneActivityPhase

Represents whatever information we can return about an explicit phase in an activity. In the future, I hope we'll have more than just "guh, you done gone and did something," but for the forseeable future that's all we've got. I'm making it more than just a list of booleans out of that overly-optimistic hope.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `complete` | `boolean` | no | Indicates if the phase has been completed. |
| `phaseHash` | `integer(uint32)` | no | In DestinyActivityDefinition, if the activity has phases, there will be a set of phases defined in the "insertionPoints" property. This is the hash that maps to that phase. |

### Destiny.Milestones.DestinyMilestoneActivityVariant

Represents custom data that we know about an individual variant of an activity.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no | The hash for the specific variant of the activity related to this milestone. You can pull more detailed static info from the DestinyActivityDefinition, such as difficulty level. |
| `completionStatus` | `object` | no | An OPTIONAL component: if it makes sense to talk about this activity variant in terms of whether or not it has been completed or what progress you have made in it, this will be returned. Otherwise, this will be NULL. |
| `activityModeHash` | `integer(uint32)` | no | The hash identifier of the most specific Activity Mode under which this activity is played. This is useful for situations where the activity in question is - for instance - a PVP map, but it's not clear what mode the PVP map is being played under. If it's a playlist, this will be less specific: but hopefully useful in some way. |
| `activityModeType` | `integer(int32)` | no | The enumeration equivalent of the most specific Activity Mode under which this activity is played. |

### Destiny.Milestones.DestinyMilestoneChallengeActivity

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no |  |
| `challenges` | `Destiny.Challenges.DestinyChallengeStatus[]` | no |  |
| `modifierHashes` | `integer(uint32)[]` | no | If the activity has modifiers, this will be the list of modifiers that all variants have in common. Perform lookups against DestinyActivityModifierDefinition which defines the modifier being applied to get at the modifier data.<br>Note that, in the DestinyActivityDefinition, you will see many more modifiers than this being referred to: those are all *possible* modifiers for the activity, not the active ones. Use only the active ones to match what's really live. |
| `booleanActivityOptions` | `object` | no | The set of activity options for this activity, keyed by an identifier that's unique for this activity (not guaranteed to be unique between or across all activities, though should be unique for every *variant* of a given *conceptual* activity: for instance, the original D2 Raid has many variant DestinyActivityDefinitions. While other activities could potentially have the same option hashes, for any given D2 base Raid variant the hash will be unique).<br>As a concrete example of this data, the hashes you get for Raids will correspond to the currently active "Challenge Mode".<br>We don't have any human readable information for these, but savvy 3rd party app users could manually associate the key (a hash identifier for the "option" that is enabled/disabled) and the value (whether it's enabled or disabled presently)<br>On our side, we don't necessarily even know what these are used for (the game designers know, but we don't), and we have no human readable data for them. In order to use them, you will have to do some experimentation. |
| `loadoutRequirementIndex` | `integer(int32)` | no | If returned, this is the index into the DestinyActivityDefinition's "loadouts" property, indicating the currently active loadout requirements. |
| `phases` | `Destiny.Milestones.DestinyMilestoneActivityPhase[]` | no | If the Activity has discrete "phases" that we can track, that info will be here. Otherwise, this value will be NULL. Note that this is a list and not a dictionary: the order implies the ascending order of phases or progression in this activity. |

### Destiny.Milestones.DestinyMilestoneContent

Represents localized, extended content related to Milestones. This is intentionally returned by a separate endpoint and not with Character-level Milestone data because we do not put localized data into standard Destiny responses, both for brevity of response and for caching purposes. If you really need this data, hit the Milestone Content endpoint.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `about` | `string` | no | The "About this Milestone" text from the Firehose. |
| `status` | `string` | no | The Current Status of the Milestone, as driven by the Firehose. |
| `tips` | `string[]` | no | A list of tips, provided by the Firehose. |
| `itemCategories` | `Destiny.Milestones.DestinyMilestoneContentItemCategory[]` | no | If DPS has defined items related to this Milestone, they can categorize those items in the Firehose. That data will then be returned as item categories here. |

### Destiny.Milestones.DestinyMilestoneContentItemCategory

Part of our dynamic, localized Milestone content is arbitrary categories of items. These are built in our content management system, and thus aren't the same as programmatically generated rewards.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | no |  |
| `itemHashes` | `integer(uint32)[]` | no |  |

### Destiny.Milestones.DestinyMilestoneQuest

If a Milestone has one or more Quests, this will contain the live information for the character's status with one of those quests.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `questItemHash` | `integer(uint32)` | no | Quests are defined as Items in content. As such, this is the hash identifier of the DestinyInventoryItemDefinition that represents this quest. It will have pointers to all of the steps in the quest, and display information for the quest (title, description, icon etc) Individual steps will be referred to in the Quest item's DestinyInventoryItemDefinition.setData property, and themselves are Items with their own renderable data. |
| `status` | `object` | no | The current status of the quest for the character making the request. |
| `activity` | `object` | no | *IF* the Milestone has an active Activity that can give you greater details about what you need to do, it will be returned here. Remember to associate this with the DestinyMilestoneDefinition's activities to get details about the activity, including what specific quest it is related to if you have multiple quests to choose from. |
| `challenges` | `Destiny.Challenges.DestinyChallengeStatus[]` | no | The activities referred to by this quest can have many associated challenges. They are all contained here, with activityHashes so that you can associate them with the specific activity variants in which they can be found. In retrospect, I probably should have put these under the specific Activity Variants, but it's too late to change it now. Theoretically, a quest without Activities can still have Challenges, which is why this is on a higher level than activity/variants, but it probably should have been in both places. That may come as a later revision. |

### Destiny.Milestones.DestinyMilestoneRewardCategory

Represents a category of "summary" rewards that can be earned for the Milestone regardless of specific quest rewards that can be earned.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `rewardCategoryHash` | `integer(uint32)` | no | Look up the relevant DestinyMilestoneDefinition, and then use rewardCategoryHash to look up the category info in DestinyMilestoneDefinition.rewards. |
| `entries` | `Destiny.Milestones.DestinyMilestoneRewardEntry[]` | no | The individual reward entries for this category, and their status. |

### Destiny.Milestones.DestinyMilestoneRewardEntry

The character-specific data for a milestone's reward entry. See DestinyMilestoneDefinition for more information about Reward Entries.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `rewardEntryHash` | `integer(uint32)` | no | The identifier for the reward entry in question. It is important to look up the related DestinyMilestoneRewardEntryDefinition to get the static details about the reward, which you can do by looking up the milestone's DestinyMilestoneDefinition and examining the DestinyMilestoneDefinition.rewards[rewardCategoryHash].rewardEntries[rewardEntryHash] data. |
| `earned` | `boolean` | no | If TRUE, the player has earned this reward. |
| `redeemed` | `boolean` | no | If TRUE, the player has redeemed/picked up/obtained this reward. Feel free to alias this to "gotTheShinyBauble" in your own codebase. |

### Destiny.Milestones.DestinyMilestoneVendor

If a Milestone has one or more Vendors that are relevant to it, this will contain information about that vendor that you can choose to show.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorHash` | `integer(uint32)` | no | The hash identifier of the Vendor related to this Milestone. You can show useful things from this, such as thier Faction icon or whatever you might care about. |
| `previewItemHash` | `integer(uint32)` | no | If this vendor is featuring a specific item for this event, this will be the hash identifier of that item. I'm taking bets now on how long we go before this needs to be a list or some other, more complex representation instead and I deprecate this too. I'm going to go with 5 months. Calling it now, 2017-09-14 at 9:46pm PST. |

### Destiny.Milestones.DestinyPublicMilestone

Information about milestones, presented in a character state-agnostic manner. Combine this data with DestinyMilestoneDefinition to get a full picture of the milestone, which is basically a checklist of things to do in the game. Think of this as GetPublicAdvisors 3.0, for those who used the Destiny 1 API.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `milestoneHash` | `integer(uint32)` | no | The hash identifier for the milestone. Use it to look up the DestinyMilestoneDefinition for static data about the Milestone. |
| `availableQuests` | `Destiny.Milestones.DestinyPublicMilestoneQuest[]` | no | A milestone not need have even a single quest, but if there are active quests they will be returned here. |
| `activities` | `Destiny.Milestones.DestinyPublicMilestoneChallengeActivity[]` | no |  |
| `vendorHashes` | `integer(uint32)[]` | no | Sometimes milestones - or activities active in milestones - will have relevant vendors. These are the vendors that are currently relevant.<br>Deprecated, already, for the sake of the new "vendors" property that has more data. What was I thinking. |
| `vendors` | `Destiny.Milestones.DestinyPublicMilestoneVendor[]` | no | This is why we can't have nice things. This is the ordered list of vendors to be shown that relate to this milestone, potentially along with other interesting data. |
| `startDate` | `string(date-time)` | no | If known, this is the date when the Milestone started/became active. |
| `endDate` | `string(date-time)` | no | If known, this is the date when the Milestone will expire/recycle/end. |
| `order` | `integer(int32)` | no | Used for ordering milestones in a display to match how we order them in BNet. May pull from static data, or possibly in the future from dynamic information. |

### Destiny.Milestones.DestinyPublicMilestoneActivity

A milestone may have one or more conceptual Activities associated with it, and each of those conceptual activities could have a variety of variants, modes, tiers, what-have-you. Our attempts to determine what qualifies as a conceptual activity are, unfortunately, janky. So if you see missing modes or modes that don't seem appropriate to you, let us know and I'll buy you a beer if we ever meet up in person.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no | The hash identifier of the activity that's been chosen to be considered the canonical "conceptual" activity definition. This may have many variants, defined herein. |
| `modifierHashes` | `integer(uint32)[]` | no | The activity may have 0-to-many modifiers: if it does, this will contain the hashes to the DestinyActivityModifierDefinition that defines the modifier being applied. |
| `variants` | `Destiny.Milestones.DestinyPublicMilestoneActivityVariant[]` | no | Every relevant variation of this conceptual activity, including the conceptual activity itself, have variants defined here. |
| `activityModeHash` | `integer(uint32)` | no | The hash identifier of the most specific Activity Mode under which this activity is played. This is useful for situations where the activity in question is - for instance - a PVP map, but it's not clear what mode the PVP map is being played under. If it's a playlist, this will be less specific: but hopefully useful in some way. |
| `activityModeType` | `integer(int32)` | no | The enumeration equivalent of the most specific Activity Mode under which this activity is played. |

### Destiny.Milestones.DestinyPublicMilestoneActivityVariant

Represents a variant of an activity that's relevant to a milestone.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no | The hash identifier of this activity variant. Examine the activity's definition in the Manifest database to determine what makes it a distinct variant. Usually it will be difficulty level or whether or not it is a guided game variant of the activity, but theoretically it could be distinguished in any arbitrary way. |
| `activityModeHash` | `integer(uint32)` | no | The hash identifier of the most specific Activity Mode under which this activity is played. This is useful for situations where the activity in question is - for instance - a PVP map, but it's not clear what mode the PVP map is being played under. If it's a playlist, this will be less specific: but hopefully useful in some way. |
| `activityModeType` | `integer(int32)` | no | The enumeration equivalent of the most specific Activity Mode under which this activity is played. |

### Destiny.Milestones.DestinyPublicMilestoneChallenge

A Milestone can have many Challenges. Challenges are just extra Objectives that provide a fun way to mix-up play and provide extra rewards.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `objectiveHash` | `integer(uint32)` | no | The objective for the Challenge, which should have human-readable data about what needs to be done to accomplish the objective. Use this hash to look up the DestinyObjectiveDefinition. |
| `activityHash` | `integer(uint32)` | no | IF the Objective is related to a specific Activity, this will be that activity's hash. Use it to look up the DestinyActivityDefinition for additional data to show. |

### Destiny.Milestones.DestinyPublicMilestoneChallengeActivity

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no |  |
| `challengeObjectiveHashes` | `integer(uint32)[]` | no |  |
| `modifierHashes` | `integer(uint32)[]` | no | If the activity has modifiers, this will be the list of modifiers that all variants have in common. Perform lookups against DestinyActivityModifierDefinition which defines the modifier being applied to get at the modifier data.<br>Note that, in the DestinyActivityDefinition, you will see many more modifiers than this being referred to: those are all *possible* modifiers for the activity, not the active ones. Use only the active ones to match what's really live. |
| `loadoutRequirementIndex` | `integer(int32)` | no | If returned, this is the index into the DestinyActivityDefinition's "loadouts" property, indicating the currently active loadout requirements. |
| `phaseHashes` | `integer(uint32)[]` | no | The ordered list of phases for this activity, if any. Note that we have no human readable info for phases, nor any entities to relate them to: relating these hashes to something human readable is up to you unfortunately. |
| `booleanActivityOptions` | `object` | no | The set of activity options for this activity, keyed by an identifier that's unique for this activity (not guaranteed to be unique between or across all activities, though should be unique for every *variant* of a given *conceptual* activity: for instance, the original D2 Raid has many variant DestinyActivityDefinitions. While other activities could potentially have the same option hashes, for any given D2 base Raid variant the hash will be unique).<br>As a concrete example of this data, the hashes you get for Raids will correspond to the currently active "Challenge Mode".<br>We have no human readable information for this data, so it's up to you if you want to associate it with such info to show it. |

### Destiny.Milestones.DestinyPublicMilestoneQuest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `questItemHash` | `integer(uint32)` | no | Quests are defined as Items in content. As such, this is the hash identifier of the DestinyInventoryItemDefinition that represents this quest. It will have pointers to all of the steps in the quest, and display information for the quest (title, description, icon etc) Individual steps will be referred to in the Quest item's DestinyInventoryItemDefinition.setData property, and themselves are Items with their own renderable data. |
| `activity` | `object` | no | A milestone need not have an active activity, but if there is one it will be returned here, along with any variant and additional information. |
| `challenges` | `Destiny.Milestones.DestinyPublicMilestoneChallenge[]` | no | For the given quest there could be 0-to-Many challenges: mini quests that you can perform in the course of doing this quest, that may grant you rewards and benefits. |

### Destiny.Milestones.DestinyPublicMilestoneVendor

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorHash` | `integer(uint32)` | no | The hash identifier of the Vendor related to this Milestone. You can show useful things from this, such as thier Faction icon or whatever you might care about. |
| `previewItemHash` | `integer(uint32)` | no | If this vendor is featuring a specific item for this event, this will be the hash identifier of that item. I'm taking bets now on how long we go before this needs to be a list or some other, more complex representation instead and I deprecate this too. I'm going to go with 5 months. Calling it now, 2017-09-14 at 9:46pm PST. |

### Destiny.Misc.DestinyColor

Represents a color whose RGBA values are all represented as values between 0 and 255.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `red` | `string(byte)` | no |  |
| `green` | `string(byte)` | no |  |
| `blue` | `string(byte)` | no |  |
| `alpha` | `string(byte)` | no |  |

### Destiny.Perks.DestinyPerkReference

The list of perks to display in an item tooltip - and whether or not they have been activated.
Perks apply a variety of effects to a character, and are generally either intrinsic to the item or provided in activated talent nodes or sockets.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `perkHash` | `integer(uint32)` | no | The hash identifier for the perk, which can be used to look up DestinySandboxPerkDefinition if it exists. Be warned, perks frequently do not have user-viewable information. You should examine whether you actually found a name/description in the perk's definition before you show it to the user. |
| `iconPath` | `string` | no | The icon for the perk. |
| `isActive` | `boolean` | no | Whether this perk is currently active. (We may return perks that you have not actually activated yet: these represent perks that you should show in the item's tooltip, but that the user has not yet activated.) |
| `visible` | `boolean` | no | Some perks provide benefits, but aren't visible in the UI. This value will let you know if this is perk should be shown in your UI. |

### Destiny.PlugAvailabilityMode

This enum determines whether the plug is available to be inserted.
- Normal means that all existing rules for plug insertion apply.
- UnavailableIfSocketContainsMatchingPlugCategory means that the plug is only available if the socket does NOT match the plug category.
- AvailableIfSocketContainsMatchingPlugCategory means that the plug is only available if the socket DOES match the plug category.
For category matching, use the plug's "plugCategoryIdentifier" property, comparing it to

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.PlugUiStyles

If the plug has a specific custom style, this enumeration will represent that style/those styles.

Type: `integer enum`

Enum values:

- `0`
- `1`

### Destiny.Progression.DestinyFactionProgression

Mostly for historical purposes, we segregate Faction progressions from other progressions. This is just a DestinyProgression with a shortcut for finding the DestinyFactionDefinition of the faction related to the progression.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `factionHash` | `integer(uint32)` | no | The hash identifier of the Faction related to this progression. Use it to look up the DestinyFactionDefinition for more rendering info. |
| `factionVendorIndex` | `integer(int32)` | no | The index of the Faction vendor that is currently available. Will be set to -1 if no vendors are available. |
| `progressionHash` | `integer(uint32)` | no | The hash identifier of the Progression in question. Use it to look up the DestinyProgressionDefinition in static data. |
| `dailyProgress` | `integer(int32)` | no | The amount of progress earned today for this progression. |
| `dailyLimit` | `integer(int32)` | no | If this progression has a daily limit, this is that limit. |
| `weeklyProgress` | `integer(int32)` | no | The amount of progress earned toward this progression in the current week. |
| `weeklyLimit` | `integer(int32)` | no | If this progression has a weekly limit, this is that limit. |
| `currentProgress` | `integer(int32)` | no | This is the total amount of progress obtained overall for this progression (for instance, the total amount of Character Level experience earned) |
| `level` | `integer(int32)` | no | This is the level of the progression (for instance, the Character Level). |
| `levelCap` | `integer(int32)` | no | This is the maximum possible level you can achieve for this progression (for example, the maximum character level obtainable) |
| `stepIndex` | `integer(int32)` | no | Progressions define their levels in "steps". Since the last step may be repeatable, the user may be at a higher level than the actual Step achieved in the progression. Not necessarily useful, but potentially interesting for those cruising the API. Relate this to the "steps" property of the DestinyProgression to see which step the user is on, if you care about that. (Note that this is Content Version dependent since it refers to indexes.) |
| `progressToNextLevel` | `integer(int32)` | no | The amount of progression (i.e. "Experience") needed to reach the next level of this Progression. Jeez, progression is such an overloaded word. |
| `nextLevelAt` | `integer(int32)` | no | The total amount of progression (i.e. "Experience") needed in order to reach the next level. |
| `currentResetCount` | `integer(int32)` | no | The number of resets of this progression you've executed this season, if applicable to this progression. |
| `seasonResets` | `Destiny.DestinyProgressionResetEntry[]` | no | Information about historical resets of this progression, if there is any data for it. |
| `rewardItemStates` | `integer(int32)[]` | no | Information about historical rewards for this progression, if there is any data for it. |
| `rewardItemSocketOverrideStates` | `object` | no | Information about items stats and states that have socket overrides, if there is any data for it. |

### Destiny.Quests.DestinyObjectiveProgress

Returns data about a character's status with a given Objective. Combine with DestinyObjectiveDefinition static data for display purposes.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `objectiveHash` | `integer(uint32)` | no | The unique identifier of the Objective being referred to. Use to look up the DestinyObjectiveDefinition in static data. |
| `destinationHash` | `integer(uint32)` | no | If the Objective has a Destination associated with it, this is the unique identifier of the Destination being referred to. Use to look up the DestinyDestinationDefinition in static data. This will give localized data about *where* in the universe the objective should be achieved. |
| `activityHash` | `integer(uint32)` | no | If the Objective has an Activity associated with it, this is the unique identifier of the Activity being referred to. Use to look up the DestinyActivityDefinition in static data. This will give localized data about *what* you should be playing for the objective to be achieved. |
| `progress` | `integer(int32)` | no | If progress has been made, and the progress can be measured numerically, this will be the value of that progress. You can compare it to the DestinyObjectiveDefinition.completionValue property for current vs. upper bounds, and use DestinyObjectiveDefinition.inProgressValueStyle or completedValueStyle to determine how this should be rendered. Note that progress, in Destiny 2, need not be a literal numeric progression. It could be one of a number of possible values, even a Timestamp. Always examine DestinyObjectiveDefinition.inProgressValueStyle or completedValueStyle before rendering progress. |
| `completionValue` | `integer(int32)` | no | As of Forsaken, objectives' completion value is determined dynamically at runtime.<br>This value represents the threshold of progress you need to surpass in order for this objective to be considered "complete".<br>If you were using objective data, switch from using the DestinyObjectiveDefinition's "completionValue" to this value. |
| `complete` | `boolean` | no | Whether or not the Objective is completed. |
| `visible` | `boolean` | no | If this is true, the objective is visible in-game. Otherwise, it's not yet visible to the player. Up to you if you want to honor this property. |

### Destiny.Quests.DestinyQuestStatus

Data regarding the progress of a Quest for a specific character. Quests are composed of multiple steps, each with potentially multiple objectives: this QuestStatus will return Objective data for the *currently active* step in this quest.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `questHash` | `integer(uint32)` | no | The hash identifier for the Quest Item. (Note: Quests are defined as Items, and thus you would use this to look up the quest's DestinyInventoryItemDefinition). For information on all steps in the quest, you can then examine its DestinyInventoryItemDefinition.setData property for Quest Steps (which are *also* items). You can use the Item Definition to display human readable data about the overall quest. |
| `stepHash` | `integer(uint32)` | no | The hash identifier of the current Quest Step, which is also a DestinyInventoryItemDefinition. You can use this to get human readable data about the current step and what to do in that step. |
| `stepObjectives` | `Destiny.Quests.DestinyObjectiveProgress[]` | no | A step can have multiple objectives. This will give you the progress for each objective in the current step, in the order in which they are rendered in-game. |
| `tracked` | `boolean` | no | Whether or not the quest is tracked |
| `itemInstanceId` | `integer(int64)` | no | The current Quest Step will be an instanced item in the player's inventory. If you care about that, this is the instance ID of that item. |
| `completed` | `boolean` | no | Whether or not the whole quest has been completed, regardless of whether or not you have redeemed the rewards for the quest. |
| `redeemed` | `boolean` | no | Whether or not you have redeemed rewards for this quest. |
| `started` | `boolean` | no | Whether or not you have started this quest. |
| `vendorHash` | `integer(uint32)` | no | If the quest has a related Vendor that you should talk to in order to initiate the quest/earn rewards/continue the quest, this will be the hash identifier of that Vendor. Look it up its DestinyVendorDefinition. |

### Destiny.Reporting.Requests.DestinyReportOffensePgcrRequest

If you want to report a player causing trouble in a game, this request will let you report that player and the specific PGCR in which the trouble was caused, along with why.
Please don't do this just because you dislike the person! I mean, I know people will do it anyways, but can you like take a good walk, or put a curse on them or something? Do me a solid and reconsider.
Note that this request object doesn't have the actual PGCR ID nor your Account/Character ID in it. We will infer that information from your authentication information and the PGCR ID that you pass into the URL of the reporting endpoint itself.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `reasonCategoryHashes` | `integer(uint32)[]` | no | So you've decided to report someone instead of cursing them and their descendants. Well, okay then. This is the category or categorie(s) of infractions for which you are reporting the user. These are hash identifiers that map to DestinyReportReasonCategoryDefinition entries. |
| `reasonHashes` | `integer(uint32)[]` | no | If applicable, provide a more specific reason(s) within the general category of problems provided by the reasonHash. This is also an identifier for a reason. All reasonHashes provided must be children of at least one the reasonCategoryHashes provided. |
| `offendingCharacterId` | `integer(int64)` | no | Within the PGCR provided when calling the Reporting endpoint, this should be the character ID of the user that you thought was violating terms of use. They must exist in the PGCR provided. |

### Destiny.Requests.Actions.DestinyActionRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `membershipType` | `integer(int32)` | no |  |

### Destiny.Requests.Actions.DestinyCharacterActionRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `characterId` | `integer(int64)` | no |  |
| `membershipType` | `integer(int32)` | no |  |

### Destiny.Requests.Actions.DestinyInsertPlugsActionRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `actionToken` | `string` | no | Action token provided by the AwaGetActionToken API call. |
| `itemInstanceId` | `integer(int64)` | no | The instance ID of the item having a plug inserted. Only instanced items can have sockets. |
| `plug` | `object` | no | The plugs being inserted. |
| `characterId` | `integer(int64)` | no |  |
| `membershipType` | `integer(int32)` | no |  |

### Destiny.Requests.Actions.DestinyInsertPlugsFreeActionRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `plug` | `object` | no | The plugs being inserted. |
| `itemId` | `integer(int64)` | no | The instance ID of the item for this action request. |
| `characterId` | `integer(int64)` | no |  |
| `membershipType` | `integer(int32)` | no |  |

### Destiny.Requests.Actions.DestinyInsertPlugsRequestEntry

Represents all of the data related to a single plug to be inserted.
Note that, while you *can* point to a socket that represents infusion, you will receive an error if you attempt to do so. Come on guys, let's play nice.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `socketIndex` | `integer(int32)` | no | The index into the socket array, which identifies the specific socket being operated on. We also need to know the socketArrayType in order to uniquely identify the socket.<br>Don't point to or try to insert a plug into an infusion socket. It won't work. |
| `socketArrayType` | `integer(int32)` | no | This property, combined with the socketIndex, tells us which socket we are referring to (since operations can be performed on both Intrinsic and "default" sockets, and they occupy different arrays in the Inventory Item Definition). I know, I know. Don't give me that look. |
| `plugItemHash` | `integer(uint32)` | no | Plugs are never instanced (except in infusion). So with the hash alone, we should be able to: 1) Infer whether the player actually needs to have the item, or if it's a reusable plug 2) Perform any operation needed to use the Plug, including removing the plug item and running reward sheets. |

### Destiny.Requests.Actions.DestinyItemActionRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemId` | `integer(int64)` | no | The instance ID of the item for this action request. |
| `characterId` | `integer(int64)` | no |  |
| `membershipType` | `integer(int32)` | no |  |

### Destiny.Requests.Actions.DestinyItemSetActionRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemIds` | `integer(int64)[]` | no |  |
| `characterId` | `integer(int64)` | no |  |
| `membershipType` | `integer(int32)` | no |  |

### Destiny.Requests.Actions.DestinyItemStateRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `boolean` | no |  |
| `itemId` | `integer(int64)` | no | The instance ID of the item for this action request. |
| `characterId` | `integer(int64)` | no |  |
| `membershipType` | `integer(int32)` | no |  |

### Destiny.Requests.Actions.DestinyLoadoutActionRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `loadoutIndex` | `integer(int32)` | no | The index of the loadout for this action request. |
| `characterId` | `integer(int64)` | no |  |
| `membershipType` | `integer(int32)` | no |  |

### Destiny.Requests.Actions.DestinyLoadoutUpdateActionRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `colorHash` | `integer(uint32)` | no |  |
| `iconHash` | `integer(uint32)` | no |  |
| `nameHash` | `integer(uint32)` | no |  |
| `loadoutIndex` | `integer(int32)` | no | The index of the loadout for this action request. |
| `characterId` | `integer(int64)` | no |  |
| `membershipType` | `integer(int32)` | no |  |

### Destiny.Requests.Actions.DestinyPostmasterTransferRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemReferenceHash` | `integer(uint32)` | no |  |
| `stackSize` | `integer(int32)` | no |  |
| `itemId` | `integer(int64)` | no | The instance ID of the item for this action request. |
| `characterId` | `integer(int64)` | no |  |
| `membershipType` | `integer(int32)` | no |  |

### Destiny.Requests.Actions.DestinySocketArrayType

If you look in the DestinyInventoryItemDefinition's "sockets" property, you'll see that there are two types of sockets: intrinsic, and "socketEntry."
Unfortunately, because Intrinsic sockets are a whole separate array, it is no longer sufficient to know the index into that array to know which socket we're talking about. You have to know whether it's in the default "socketEntries" or if it's in the "intrinsic" list.

Type: `integer enum`

Enum values:

- `0`
- `1`

### Destiny.Requests.DestinyItemTransferRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemReferenceHash` | `integer(uint32)` | no |  |
| `stackSize` | `integer(int32)` | no |  |
| `transferToVault` | `boolean` | no |  |
| `itemId` | `integer(int64)` | no | The instance ID of the item for this action request. |
| `characterId` | `integer(int64)` | no |  |
| `membershipType` | `integer(int32)` | no |  |

### Destiny.Responses.DestinyCharacterResponse

The response contract for GetDestinyCharacter, with components that can be returned for character and item-level data.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `inventory` | `object` | no | The character-level non-equipped inventory items.<br>COMPONENT TYPE: CharacterInventories |
| `character` | `object` | no | Base information about the character in question.<br>COMPONENT TYPE: Characters |
| `progressions` | `object` | no | Character progression data, including Milestones.<br>COMPONENT TYPE: CharacterProgressions |
| `renderData` | `object` | no | Character rendering data - a minimal set of information about equipment and dyes used for rendering.<br>COMPONENT TYPE: CharacterRenderData |
| `activities` | `object` | no | Activity data - info about current activities available to the player.<br>COMPONENT TYPE: CharacterActivities |
| `equipment` | `object` | no | Equipped items on the character.<br>COMPONENT TYPE: CharacterEquipment |
| `loadouts` | `object` | no | The loadouts available to the character.<br>COMPONENT TYPE: CharacterLoadouts |
| `kiosks` | `object` | no | Items available from Kiosks that are available to this specific character. <br>COMPONENT TYPE: Kiosks |
| `plugSets` | `object` | no | When sockets refer to reusable Plug Sets (see DestinyPlugSetDefinition for more info), this is the set of plugs and their states that are scoped to this character.<br>This comes back with ItemSockets, as it is needed for a complete picture of the sockets on requested items.<br>COMPONENT TYPE: ItemSockets |
| `presentationNodes` | `object` | no | COMPONENT TYPE: PresentationNodes |
| `records` | `object` | no | COMPONENT TYPE: Records |
| `collectibles` | `object` | no | COMPONENT TYPE: Collectibles |
| `itemComponents` | `object` | no | The set of components belonging to the player's instanced items.<br>COMPONENT TYPE: [See inside the DestinyItemComponentSet contract for component types.] |
| `uninstancedItemComponents` | `object` | no | The set of components belonging to the player's UNinstanced items. Because apparently now those too can have information relevant to the character's state.<br>COMPONENT TYPE: [See inside the DestinyItemComponentSet contract for component types.] |
| `currencyLookups` | `object` | no | A "lookup" convenience component that can be used to quickly check if the character has access to items that can be used for purchasing.<br>COMPONENT TYPE: CurrencyLookups |

### Destiny.Responses.DestinyCollectibleNodeDetailResponse

Returns the detailed information about a Collectible Presentation Node and any Collectibles that are direct descendants.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `collectibles` | `object` | no | COMPONENT TYPE: Collectibles |
| `collectibleItemComponents` | `object` | no | Item components, keyed by the item hash of the items pointed at collectibles found under the requested Presentation Node.<br>NOTE: I had a lot of hemming and hawing about whether these should be keyed by collectible hash or item hash... but ultimately having it be keyed by item hash meant that UI that already uses DestinyItemComponentSet data wouldn't have to have a special override to do the collectible -> item lookup once you delve into an item's details, and it also meant that you didn't have to remember that the Hash being used as the key for plugSets was different from the Hash being used for the other Dictionaries. As a result, using the Item Hash felt like the least crappy solution.<br>We may all come to regret this decision. We will see.<br>COMPONENT TYPE: [See inside the DestinyItemComponentSet contract for component types.] |

### Destiny.Responses.DestinyErrorProfile

If a Destiny Profile can't be returned, but we're pretty certain it's a valid Destiny account, this will contain as much info as we can get about the profile for your use.
Assume that the most you'll get is the Error Code, the Membership Type and the Membership ID.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `errorCode` | `integer(int32)` | no | The error that we encountered. You should be able to look up localized text to show to the user for these failures. |
| `infoCard` | `object` | no | Basic info about the account that failed. Don't expect anything other than membership ID, Membership Type, and displayName to be populated. |

### Destiny.Responses.DestinyItemChangeResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `item` | `Destiny.Responses.DestinyItemResponse` | no |  |
| `addedInventoryItems` | `Destiny.Entities.Items.DestinyItemComponent[]` | no | Items that appeared in the inventory possibly as a result of an action. |
| `removedInventoryItems` | `Destiny.Entities.Items.DestinyItemComponent[]` | no | Items that disappeared from the inventory possibly as a result of an action. |

### Destiny.Responses.DestinyItemResponse

The response object for retrieving an individual instanced item. None of these components are relevant for an item that doesn't have an "itemInstanceId": for those, get your information from the DestinyInventoryDefinition.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `characterId` | `integer(int64)` | no | If the item is on a character, this will return the ID of the character that is holding the item. |
| `item` | `object` | no | Common data for the item relevant to its non-instanced properties.<br>COMPONENT TYPE: ItemCommonData |
| `instance` | `object` | no | Basic instance data for the item.<br>COMPONENT TYPE: ItemInstances |
| `objectives` | `object` | no | Information specifically about the item's objectives.<br>COMPONENT TYPE: ItemObjectives |
| `perks` | `object` | no | Information specifically about the perks currently active on the item.<br>COMPONENT TYPE: ItemPerks |
| `renderData` | `object` | no | Information about how to render the item in 3D.<br>COMPONENT TYPE: ItemRenderData |
| `stats` | `object` | no | Information about the computed stats of the item: power, defense, etc...<br>COMPONENT TYPE: ItemStats |
| `talentGrid` | `object` | no | Information about the talent grid attached to the item. Talent nodes can provide a variety of benefits and abilities, and in Destiny 2 are used almost exclusively for the character's "Builds".<br>COMPONENT TYPE: ItemTalentGrids |
| `sockets` | `object` | no | Information about the sockets of the item: which are currently active, what potential sockets you could have and the stats/abilities/perks you can gain from them.<br>COMPONENT TYPE: ItemSockets |
| `reusablePlugs` | `object` | no | Information about the Reusable Plugs for sockets on an item. These are plugs that you can insert into the given socket regardless of if you actually own an instance of that plug: they are logic-driven plugs rather than inventory-driven.<br> These may need to be combined with Plug Set component data to get a full picture of available plugs on a given socket.<br> COMPONENT TYPE: ItemReusablePlugs |
| `plugObjectives` | `object` | no | Information about objectives on Plugs for a given item. See the component's documentation for more info.<br>COMPONENT TYPE: ItemPlugObjectives |

### Destiny.Responses.DestinyLinkedProfilesResponse

I know what you seek. You seek linked accounts. Found them, you have.
This contract returns a minimal amount of data about Destiny Accounts that are linked through your Bungie.Net account. We will not return accounts in this response whose

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `profiles` | `Destiny.Responses.DestinyProfileUserInfoCard[]` | no | Any Destiny account for whom we could successfully pull characters will be returned here, as the Platform-level summary of user data. (no character data, no Destiny account data other than the Membership ID and Type so you can make further queries) |
| `bnetMembership` | `object` | no | If the requested membership had a linked Bungie.Net membership ID, this is the basic information about that BNet account.<br>I know, Tetron; I know this is mixing UserServices concerns with DestinyServices concerns. But it's so damn convenient! https://www.youtube.com/watch?v=X5R-bB-gKVI |
| `profilesWithErrors` | `Destiny.Responses.DestinyErrorProfile[]` | no | This is brief summary info for profiles that we believe have valid Destiny info, but who failed to return data for some other reason and thus we know that subsequent calls for their info will also fail. |

### Destiny.Responses.DestinyProfileResponse

The response for GetDestinyProfile, with components for character and item-level data.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `responseMintedTimestamp` | `string(date-time)` | no | Records the timestamp of when most components were last generated from the world server source. Unless the component type is specified in the documentation for secondaryComponentsMintedTimestamp, this value is sufficient to do data freshness. |
| `secondaryComponentsMintedTimestamp` | `string(date-time)` | no | Some secondary components are not tracked in the primary response timestamp and have their timestamp tracked here. If your component is any of the following, this field is where you will find your timestamp value:<br> PresentationNodes, Records, Collectibles, Metrics, StringVariables, Craftables, Transitory<br> All other component types may use the primary timestamp property. |
| `vendorReceipts` | `object` | no | Recent, refundable purchases you have made from vendors. When will you use it? Couldn't say...<br>COMPONENT TYPE: VendorReceipts |
| `profileInventory` | `object` | no | The profile-level inventory of the Destiny Profile.<br>COMPONENT TYPE: ProfileInventories |
| `profileCurrencies` | `object` | no | The profile-level currencies owned by the Destiny Profile.<br>COMPONENT TYPE: ProfileCurrencies |
| `profile` | `object` | no | The basic information about the Destiny Profile (formerly "Account").<br>COMPONENT TYPE: Profiles |
| `platformSilver` | `object` | no | Silver quantities for any platform on which this Profile plays destiny.<br> COMPONENT TYPE: PlatformSilver |
| `profileKiosks` | `object` | no | Items available from Kiosks that are available Profile-wide (i.e. across all characters)<br>This component returns information about what Kiosk items are available to you on a *Profile* level. It is theoretically possible for Kiosks to have items gated by specific Character as well. If you ever have those, you will find them on the characterKiosks property.<br>COMPONENT TYPE: Kiosks |
| `profilePlugSets` | `object` | no | When sockets refer to reusable Plug Sets (see DestinyPlugSetDefinition for more info), this is the set of plugs and their states that are profile-scoped.<br>This comes back with ItemSockets, as it is needed for a complete picture of the sockets on requested items.<br>COMPONENT TYPE: ItemSockets |
| `profileProgression` | `object` | no | When we have progression information - such as Checklists - that may apply profile-wide, it will be returned here rather than in the per-character progression data.<br>COMPONENT TYPE: ProfileProgression |
| `profilePresentationNodes` | `object` | no | COMPONENT TYPE: PresentationNodes |
| `profileRecords` | `object` | no | COMPONENT TYPE: Records |
| `profileCollectibles` | `object` | no | COMPONENT TYPE: Collectibles |
| `profileTransitoryData` | `object` | no | COMPONENT TYPE: Transitory |
| `metrics` | `object` | no | COMPONENT TYPE: Metrics |
| `profileStringVariables` | `object` | no | COMPONENT TYPE: StringVariables |
| `profileCommendations` | `object` | no | COMPONENT TYPE: SocialCommendations |
| `characters` | `object` | no | Basic information about each character, keyed by the CharacterId.<br>COMPONENT TYPE: Characters |
| `characterInventories` | `object` | no | The character-level non-equipped inventory items, keyed by the Character's Id.<br>COMPONENT TYPE: CharacterInventories |
| `characterLoadouts` | `object` | no | The character loadouts, keyed by the Character's Id.<br>COMPONENT TYPE: CharacterLoadouts |
| `characterProgressions` | `object` | no | Character-level progression data, keyed by the Character's Id.<br>COMPONENT TYPE: CharacterProgressions |
| `characterRenderData` | `object` | no | Character rendering data - a minimal set of info needed to render a character in 3D - keyed by the Character's Id.<br>COMPONENT TYPE: CharacterRenderData |
| `characterActivities` | `object` | no | Character activity data - the activities available to this character and its status, keyed by the Character's Id.<br>COMPONENT TYPE: CharacterActivities |
| `characterEquipment` | `object` | no | The character's equipped items, keyed by the Character's Id.<br>COMPONENT TYPE: CharacterEquipment |
| `characterKiosks` | `object` | no | Items available from Kiosks that are available to a specific character as opposed to the account as a whole. It must be combined with data from the profileKiosks property to get a full picture of the character's available items to check out of a kiosk.<br>This component returns information about what Kiosk items are available to you on a *Character* level. Usually, kiosk items will be earned for the entire Profile (all characters) at once. To find those, look in the profileKiosks property.<br>COMPONENT TYPE: Kiosks |
| `characterPlugSets` | `object` | no | When sockets refer to reusable Plug Sets (see DestinyPlugSetDefinition for more info), this is the set of plugs and their states, per character, that are character-scoped.<br>This comes back with ItemSockets, as it is needed for a complete picture of the sockets on requested items.<br>COMPONENT TYPE: ItemSockets |
| `characterUninstancedItemComponents` | `object` | no | Do you ever get the feeling that a system was designed *too* flexibly? That it can be used in so many different ways that you end up being unable to provide an easy to use abstraction for the mess that's happening under the surface?<br>Let's talk about character-specific data that might be related to items without instances. These two statements are totally unrelated, I promise.<br>At some point during D2, it was decided that items - such as Bounties - could be given to characters and *not* have instance data, but that *could* display and even use relevant state information on your account and character.<br>Up to now, any item that had meaningful dependencies on character or account state had to be instanced, and thus "itemComponents" was all that you needed: it was keyed by item's instance IDs and provided the stateful information you needed inside.<br>Unfortunately, we don't live in such a magical world anymore. This is information held on a per-character basis about non-instanced items that the characters have in their inventory - or that reference character-specific state information even if it's in Account-level inventory - and the values related to that item's state in relation to the given character.<br>To give a concrete example, look at a Moments of Triumph bounty. They exist in a character's inventory, and show/care about a character's progression toward completing the bounty. But the bounty itself is a non-instanced item, like a mod or a currency. This returns that data for the characters who have the bounty in their inventory.<br>I'm not crying, you're crying Okay we're both crying but it's going to be okay I promise Actually I shouldn't promise that, I don't know if it's going to be okay |
| `characterPresentationNodes` | `object` | no | COMPONENT TYPE: PresentationNodes |
| `characterRecords` | `object` | no | COMPONENT TYPE: Records |
| `characterCollectibles` | `object` | no | COMPONENT TYPE: Collectibles |
| `characterStringVariables` | `object` | no | COMPONENT TYPE: StringVariables |
| `characterCraftables` | `object` | no | COMPONENT TYPE: Craftables |
| `itemComponents` | `object` | no | Information about instanced items across all returned characters, keyed by the item's instance ID.<br>COMPONENT TYPE: [See inside the DestinyItemComponentSet contract for component types.] |
| `characterCurrencyLookups` | `object` | no | A "lookup" convenience component that can be used to quickly check if the character has access to items that can be used for purchasing.<br>COMPONENT TYPE: CurrencyLookups |

### Destiny.Responses.DestinyProfileUserInfoCard

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `dateLastPlayed` | `string(date-time)` | no |  |
| `isOverridden` | `boolean` | no | If this profile is being overridden/obscured by Cross Save, this will be set to true. We will still return the profile for display purposes where users need to know the info: it is up to any given area of the app/site to determine if this profile should still be shown. |
| `isCrossSavePrimary` | `boolean` | no | If true, this account is hooked up as the "Primary" cross save account for one or more platforms. |
| `platformSilver` | `object` | no | This is the silver available on this Profile across any platforms on which they have purchased silver.<br> This is only available if you are requesting yourself. |
| `unpairedGameVersions` | `integer(int32)` | no | If this profile is not in a cross save pairing, this will return the game versions that we believe this profile has access to.<br> For the time being, we will not return this information for any membership that is in a cross save pairing. The gist is that, once the pairing occurs, we do not currently have a consistent way to get that information for the profile's original Platform, and thus gameVersions would be too inconsistent (based on the last platform they happened to play on) for the info to be useful.<br> If we ever can get this data, this field will be deprecated and replaced with data on the DestinyLinkedProfileResponse itself, with game versions per linked Platform. But since we can't get that, we have this as a stop-gap measure for getting the data in the only situation that we currently need it. |
| `supplementalDisplayName` | `string` | no | A platform specific additional display name - ex: psn Real Name, bnet Unique Name, etc. |
| `iconPath` | `string` | no | URL the Icon if available. |
| `crossSaveOverride` | `integer(int32)` | no | If there is a cross save override in effect, this value will tell you the type that is overridding this one. |
| `applicableMembershipTypes` | `integer(int32)[]` | no | The list of Membership Types indicating the platforms on which this Membership can be used.<br> Not in Cross Save = its original membership type. Cross Save Primary = Any membership types it is overridding, and its original membership type Cross Save Overridden = Empty list |
| `isPublic` | `boolean` | no | If True, this is a public user membership. |
| `membershipType` | `integer(int32)` | no | Type of the membership. Not necessarily the native type. |
| `membershipId` | `integer(int64)` | no | Membership ID as they user is known in the Accounts service |
| `displayName` | `string` | no | Display Name the player has chosen for themselves. The display name is optional when the data type is used as input to a platform API. |
| `bungieGlobalDisplayName` | `string` | no | The bungie global display name, if set. |
| `bungieGlobalDisplayNameCode` | `integer(int16)` | no | The bungie global display name code, if set. |

### Destiny.Responses.DestinyPublicVendorsResponse

A response containing all valid components for the public Vendors endpoint.
 It is a decisively smaller subset of data compared to what we can get when we know the specific user making the request.
 If you want any of the other data - item details, whether or not you can buy it, etc... you'll have to call in the context of a character. I know, sad but true.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorGroups` | `object` | no | For Vendors being returned, this will give you the information you need to group them and order them in the same way that the Bungie Companion app performs grouping. It will automatically be returned if you request the Vendors component.<br>COMPONENT TYPE: Vendors |
| `vendors` | `object` | no | The base properties of the vendor. These are keyed by the Vendor Hash, so you will get one Vendor Component per vendor returned.<br>COMPONENT TYPE: Vendors |
| `categories` | `object` | no | Categories that the vendor has available, and references to the sales therein. These are keyed by the Vendor Hash, so you will get one Categories Component per vendor returned.<br>COMPONENT TYPE: VendorCategories |
| `sales` | `object` | no | Sales, keyed by the vendorItemIndex of the item being sold. These are keyed by the Vendor Hash, so you will get one Sale Item Set Component per vendor returned.<br>Note that within the Sale Item Set component, the sales are themselves keyed by the vendorSaleIndex, so you can relate it to the corrent sale item definition within the Vendor's definition.<br>COMPONENT TYPE: VendorSales |
| `stringVariables` | `object` | no | A set of string variable values by hash for a public vendors context.<br>COMPONENT TYPE: StringVariables |

### Destiny.Responses.DestinyVendorResponse

A response containing all of the components for a vendor.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendor` | `object` | no | The base properties of the vendor.<br>COMPONENT TYPE: Vendors |
| `categories` | `object` | no | Categories that the vendor has available, and references to the sales therein.<br>COMPONENT TYPE: VendorCategories |
| `sales` | `object` | no | Sales, keyed by the vendorItemIndex of the item being sold.<br>COMPONENT TYPE: VendorSales |
| `itemComponents` | `object` | no | Item components, keyed by the vendorItemIndex of the active sale items.<br>COMPONENT TYPE: [See inside the DestinyVendorItemComponentSet contract for component types.] |
| `currencyLookups` | `object` | no | A "lookup" convenience component that can be used to quickly check if the character has access to items that can be used for purchasing.<br>COMPONENT TYPE: CurrencyLookups |
| `stringVariables` | `object` | no | A map of string variable values by hash for this character context.<br>COMPONENT TYPE: StringVariables |

### Destiny.Responses.DestinyVendorsResponse

A response containing all of the components for all requested vendors.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `vendorGroups` | `object` | no | For Vendors being returned, this will give you the information you need to group them and order them in the same way that the Bungie Companion app performs grouping. It will automatically be returned if you request the Vendors component.<br>COMPONENT TYPE: Vendors |
| `vendors` | `object` | no | The base properties of the vendor. These are keyed by the Vendor Hash, so you will get one Vendor Component per vendor returned.<br>COMPONENT TYPE: Vendors |
| `categories` | `object` | no | Categories that the vendor has available, and references to the sales therein. These are keyed by the Vendor Hash, so you will get one Categories Component per vendor returned.<br>COMPONENT TYPE: VendorCategories |
| `sales` | `object` | no | Sales, keyed by the vendorItemIndex of the item being sold. These are keyed by the Vendor Hash, so you will get one Sale Item Set Component per vendor returned.<br>Note that within the Sale Item Set component, the sales are themselves keyed by the vendorSaleIndex, so you can relate it to the current sale item definition within the Vendor's definition.<br>COMPONENT TYPE: VendorSales |
| `itemComponents` | `object` | no | The set of item detail components, one set of item components per Vendor. These are keyed by the Vendor Hash, so you will get one Item Component Set per vendor returned.<br>The components contained inside are themselves keyed by the vendorSaleIndex, and will have whatever item-level components you requested (Sockets, Stats, Instance data etc...) per item being sold by the vendor. |
| `currencyLookups` | `object` | no | A "lookup" convenience component that can be used to quickly check if the character has access to items that can be used for purchasing.<br>COMPONENT TYPE: CurrencyLookups |
| `stringVariables` | `object` | no | A map of string variable values by hash for this character context.<br>COMPONENT TYPE: StringVariables |

### Destiny.Responses.InventoryChangedResponse

A response containing all of the components for all requested vendors.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `addedInventoryItems` | `Destiny.Entities.Items.DestinyItemComponent[]` | no | Items that appeared in the inventory possibly as a result of an action. |
| `removedInventoryItems` | `Destiny.Entities.Items.DestinyItemComponent[]` | no | Items that disappeared from the inventory possibly as a result of an action. |

### Destiny.Responses.PersonalDestinyVendorSaleItemSetComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `saleItems` | `object` | no |  |

### Destiny.Responses.PublicDestinyVendorSaleItemSetComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `saleItems` | `object` | no |  |

### Destiny.SocketPlugSources

Indicates how a socket is populated, and where you should look for valid plug data.
 This is a flags enumeration/bitmask field, as you may have to look in multiple sources across multiple components for valid plugs.
 For instance, a socket could have plugs that are sourced from its own definition, as well as plugs that are sourced from Character-scoped AND profile-scoped Plug Sets. Only by combining plug data for every indicated source will you be able to know all of the plugs available for a socket.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`

### Destiny.Sockets.DestinyItemPlug

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `plugObjectives` | `Destiny.Quests.DestinyObjectiveProgress[]` | no | Sometimes, Plugs may have objectives: these are often used for flavor and display purposes, but they can be used for any arbitrary purpose (both fortunately and unfortunately). Recently (with Season 2) they were expanded in use to be used as the "gating" for whether the plug can be inserted at all. For instance, a Plug might be tracking the number of PVP kills you have made. It will use the parent item's data about that tracking status to determine what to show, and will generally show it using the DestinyObjectiveDefinition's progressDescription property. Refer to the plug's itemHash and objective property for more information if you would like to display even more data. |
| `plugItemHash` | `integer(uint32)` | no | The hash identifier of the DestinyInventoryItemDefinition that represents this plug. |
| `canInsert` | `boolean` | no | If true, this plug has met all of its insertion requirements. Big if true. |
| `enabled` | `boolean` | no | If true, this plug will provide its benefits while inserted. |
| `insertFailIndexes` | `integer(int32)[]` | no | If the plug cannot be inserted for some reason, this will have the indexes into the plug item definition's plug.insertionRules property, so you can show the reasons why it can't be inserted.<br>This list will be empty if the plug can be inserted. |
| `enableFailIndexes` | `integer(int32)[]` | no | If a plug is not enabled, this will be populated with indexes into the plug item definition's plug.enabledRules property, so that you can show the reasons why it is not enabled.<br>This list will be empty if the plug is enabled. |
| `stackSize` | `integer(int32)` | no | If available, this is the stack size to display for the socket plug item. |
| `maxStackSize` | `integer(int32)` | no | If available, this is the maximum stack size to display for the socket plug item. |

### Destiny.Sockets.DestinyItemPlugBase

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `plugItemHash` | `integer(uint32)` | no | The hash identifier of the DestinyInventoryItemDefinition that represents this plug. |
| `canInsert` | `boolean` | no | If true, this plug has met all of its insertion requirements. Big if true. |
| `enabled` | `boolean` | no | If true, this plug will provide its benefits while inserted. |
| `insertFailIndexes` | `integer(int32)[]` | no | If the plug cannot be inserted for some reason, this will have the indexes into the plug item definition's plug.insertionRules property, so you can show the reasons why it can't be inserted.<br>This list will be empty if the plug can be inserted. |
| `enableFailIndexes` | `integer(int32)[]` | no | If a plug is not enabled, this will be populated with indexes into the plug item definition's plug.enabledRules property, so that you can show the reasons why it is not enabled.<br>This list will be empty if the plug is enabled. |
| `stackSize` | `integer(int32)` | no | If available, this is the stack size to display for the socket plug item. |
| `maxStackSize` | `integer(int32)` | no | If available, this is the maximum stack size to display for the socket plug item. |

### Destiny.SocketTypeActionType

Indicates the type of actions that can be performed

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Destiny.SpecialItemType

As you run into items that need to be classified for Milestone purposes in ways that we cannot infer via direct data, add a new classification here and use a string constant to represent it in the local item config file.
NOTE: This is not all of the item types available, and some of these are holdovers from Destiny 1 that may or may not still exist.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `8`
- `9`
- `23`
- `24`
- `25`
- `27`
- `29`

### Destiny.TierType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`

### Destiny.TransferStatuses

Whether you can transfer an item, and why not if you can't.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`

### Destiny.VendorDisplayCategorySortOrder

Display categories can have custom sort orders. These are the possible options.

Type: `integer enum`

Enum values:

- `0`
- `1`

### Destiny.VendorInteractionType

An enumeration of the known UI interactions for Vendors.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`

### Destiny.VendorItemStatus

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`
- `128`
- `256`
- `512`
- `1024`
- `2048`
- `4096`
- `8192`

### Destiny.Vendors.DestinyVendorReceipt

If a character purchased an item that is refundable, a Vendor Receipt will be created on the user's Destiny Profile. These expire after a configurable period of time, but until then can be used to get refunds on items. BNet does not provide the ability to refund a purchase *yet*, but you know.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `currencyPaid` | `Destiny.DestinyItemQuantity[]` | no | The amount paid for the item, in terms of items that were consumed in the purchase and their quantity. |
| `itemReceived` | `object` | no | The item that was received, and its quantity. |
| `licenseUnlockHash` | `integer(uint32)` | no | The unlock flag used to determine whether you still have the purchased item. |
| `purchasedByCharacterId` | `integer(int64)` | no | The ID of the character who made the purchase. |
| `refundPolicy` | `integer(int32)` | no | Whether you can get a refund, and what happens in order for the refund to be received. See the DestinyVendorItemRefundPolicy enum for details. |
| `sequenceNumber` | `integer(int32)` | no | The identifier of this receipt. |
| `timeToExpiration` | `integer(int64)` | no | The seconds since epoch at which this receipt is rendered invalid. |
| `expiresOn` | `string(date-time)` | no | The date at which this receipt is rendered invalid. |

### DestinyBaseItemComponentSetOfint32

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `objectives` | `DictionaryComponentResponseOfint32AndDestinyItemObjectivesComponent` | no |  |
| `perks` | `DictionaryComponentResponseOfint32AndDestinyItemPerksComponent` | no |  |

### DestinyBaseItemComponentSetOfint64

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `objectives` | `DictionaryComponentResponseOfint64AndDestinyItemObjectivesComponent` | no |  |
| `perks` | `DictionaryComponentResponseOfint64AndDestinyItemPerksComponent` | no |  |

### DestinyBaseItemComponentSetOfuint32

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `objectives` | `DictionaryComponentResponseOfuint32AndDestinyItemObjectivesComponent` | no |  |
| `perks` | `DictionaryComponentResponseOfuint32AndDestinyItemPerksComponent` | no |  |

### DestinyItemComponentSetOfint32

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `instances` | `DictionaryComponentResponseOfint32AndDestinyItemInstanceComponent` | no |  |
| `renderData` | `DictionaryComponentResponseOfint32AndDestinyItemRenderComponent` | no |  |
| `stats` | `DictionaryComponentResponseOfint32AndDestinyItemStatsComponent` | no |  |
| `sockets` | `DictionaryComponentResponseOfint32AndDestinyItemSocketsComponent` | no |  |
| `reusablePlugs` | `DictionaryComponentResponseOfint32AndDestinyItemReusablePlugsComponent` | no |  |
| `plugObjectives` | `DictionaryComponentResponseOfint32AndDestinyItemPlugObjectivesComponent` | no |  |
| `talentGrids` | `DictionaryComponentResponseOfint32AndDestinyItemTalentGridComponent` | no |  |
| `plugStates` | `DictionaryComponentResponseOfuint32AndDestinyItemPlugComponent` | no |  |
| `objectives` | `DictionaryComponentResponseOfint32AndDestinyItemObjectivesComponent` | no |  |
| `perks` | `DictionaryComponentResponseOfint32AndDestinyItemPerksComponent` | no |  |

### DestinyItemComponentSetOfint64

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `instances` | `DictionaryComponentResponseOfint64AndDestinyItemInstanceComponent` | no |  |
| `renderData` | `DictionaryComponentResponseOfint64AndDestinyItemRenderComponent` | no |  |
| `stats` | `DictionaryComponentResponseOfint64AndDestinyItemStatsComponent` | no |  |
| `sockets` | `DictionaryComponentResponseOfint64AndDestinyItemSocketsComponent` | no |  |
| `reusablePlugs` | `DictionaryComponentResponseOfint64AndDestinyItemReusablePlugsComponent` | no |  |
| `plugObjectives` | `DictionaryComponentResponseOfint64AndDestinyItemPlugObjectivesComponent` | no |  |
| `talentGrids` | `DictionaryComponentResponseOfint64AndDestinyItemTalentGridComponent` | no |  |
| `plugStates` | `DictionaryComponentResponseOfuint32AndDestinyItemPlugComponent` | no |  |
| `objectives` | `DictionaryComponentResponseOfint64AndDestinyItemObjectivesComponent` | no |  |
| `perks` | `DictionaryComponentResponseOfint64AndDestinyItemPerksComponent` | no |  |

### DestinyItemComponentSetOfuint32

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `instances` | `DictionaryComponentResponseOfuint32AndDestinyItemInstanceComponent` | no |  |
| `renderData` | `DictionaryComponentResponseOfuint32AndDestinyItemRenderComponent` | no |  |
| `stats` | `DictionaryComponentResponseOfuint32AndDestinyItemStatsComponent` | no |  |
| `sockets` | `DictionaryComponentResponseOfuint32AndDestinyItemSocketsComponent` | no |  |
| `reusablePlugs` | `DictionaryComponentResponseOfuint32AndDestinyItemReusablePlugsComponent` | no |  |
| `plugObjectives` | `DictionaryComponentResponseOfuint32AndDestinyItemPlugObjectivesComponent` | no |  |
| `talentGrids` | `DictionaryComponentResponseOfuint32AndDestinyItemTalentGridComponent` | no |  |
| `plugStates` | `DictionaryComponentResponseOfuint32AndDestinyItemPlugComponent` | no |  |
| `objectives` | `DictionaryComponentResponseOfuint32AndDestinyItemObjectivesComponent` | no |  |
| `perks` | `DictionaryComponentResponseOfuint32AndDestinyItemPerksComponent` | no |  |

### DestinyVendorItemComponentSetOfint32

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemComponents` | `DictionaryComponentResponseOfint32AndDestinyItemComponent` | no |  |
| `instances` | `DictionaryComponentResponseOfint32AndDestinyItemInstanceComponent` | no |  |
| `renderData` | `DictionaryComponentResponseOfint32AndDestinyItemRenderComponent` | no |  |
| `stats` | `DictionaryComponentResponseOfint32AndDestinyItemStatsComponent` | no |  |
| `sockets` | `DictionaryComponentResponseOfint32AndDestinyItemSocketsComponent` | no |  |
| `reusablePlugs` | `DictionaryComponentResponseOfint32AndDestinyItemReusablePlugsComponent` | no |  |
| `plugObjectives` | `DictionaryComponentResponseOfint32AndDestinyItemPlugObjectivesComponent` | no |  |
| `talentGrids` | `DictionaryComponentResponseOfint32AndDestinyItemTalentGridComponent` | no |  |
| `plugStates` | `DictionaryComponentResponseOfuint32AndDestinyItemPlugComponent` | no |  |
| `objectives` | `DictionaryComponentResponseOfint32AndDestinyItemObjectivesComponent` | no |  |
| `perks` | `DictionaryComponentResponseOfint32AndDestinyItemPerksComponent` | no |  |

### DestinyVendorSaleItemSetComponentOfDestinyPublicVendorSaleItemComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `saleItems` | `object` | no |  |

### DestinyVendorSaleItemSetComponentOfDestinyVendorSaleItemComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `saleItems` | `object` | no |  |

### DictionaryComponentResponseOfint32AndDestinyItemComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint32AndDestinyItemInstanceComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint32AndDestinyItemObjectivesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint32AndDestinyItemPerksComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint32AndDestinyItemPlugObjectivesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint32AndDestinyItemRenderComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint32AndDestinyItemReusablePlugsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint32AndDestinyItemSocketsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint32AndDestinyItemStatsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint32AndDestinyItemTalentGridComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint32AndDestinyVendorSaleItemComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyCharacterActivitiesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyCharacterComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyCharacterProgressionComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyCharacterRecordsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyCharacterRenderComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyCollectiblesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyCraftablesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyCurrenciesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyInventoryComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyItemInstanceComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyItemObjectivesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyItemPerksComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyItemPlugObjectivesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyItemRenderComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyItemReusablePlugsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyItemSocketsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyItemStatsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyItemTalentGridComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyKiosksComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyLoadoutsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyPlugSetsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyPresentationNodesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfint64AndDestinyStringVariablesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyItemInstanceComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyItemObjectivesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyItemPerksComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyItemPlugComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyItemPlugObjectivesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyItemRenderComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyItemReusablePlugsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyItemSocketsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyItemStatsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyItemTalentGridComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyPublicVendorComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyVendorCategoriesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndDestinyVendorComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndPersonalDestinyVendorSaleItemSetComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### DictionaryComponentResponseOfuint32AndPublicDestinyVendorSaleItemSetComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `object` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### Entities.EntityActionResult

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `entityId` | `integer(int64)` | no |  |
| `result` | `integer(int32)` | no |  |

### Exceptions.PlatformErrorCodes

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`
- `15`
- `16`
- `17`
- `18`
- `19`
- `20`
- `21`
- `22`
- `23`
- `24`
- `25`
- `26`
- `27`
- `28`
- `29`
- `30`
- `31`
- `32`
- `33`
- `34`
- `35`
- `36`
- `37`
- `38`
- `39`
- `40`
- `41`
- `42`
- `43`
- `44`
- `45`
- `46`
- `47`
- `48`
- `49`
- `50`
- `51`
- `52`
- `53`
- `54`
- `55`
- `56`
- `57`
- `58`
- `59`
- `60`
- `89`
- `90`
- `91`
- `92`
- `93`
- `94`
- `95`
- `96`
- `97`
- `98`
- `99`
- `100`
- `101`
- `102`
- `103`
- `104`
- `105`
- `106`
- `107`
- `108`
- `109`
- `110`
- `111`
- `112`
- `113`
- `115`
- `116`
- `117`
- `118`
- `119`
- `120`
- `121`
- `122`
- `123`
- `124`
- `125`
- `126`
- `127`
- `128`
- `129`
- `130`
- `131`
- `132`
- `133`
- `134`
- `135`
- `136`
- `137`
- `138`
- `139`
- `140`
- `141`
- `142`
- `143`
- `144`
- `145`
- `146`
- `147`
- `148`
- `149`
- `150`
- `151`
- `152`
- `153`
- `154`
- `155`
- `156`
- `157`
- `158`
- `159`
- `160`
- `161`
- `162`
- `163`
- `164`
- `165`
- `166`
- `167`
- `168`
- `169`
- `170`
- `171`
- `172`
- `173`
- `174`
- `175`
- `176`
- `177`
- `178`
- `179`
- `180`
- `181`
- `200`
- `201`
- `202`
- `203`
- `204`
- `205`
- `206`
- `207`
- `208`
- `209`
- `210`
- `211`
- `212`
- `213`
- `214`
- `215`
- `216`
- `217`
- `218`
- `219`
- `220`
- `221`
- `222`
- `223`
- `224`
- `225`
- `226`
- `227`
- `228`
- `229`
- `230`
- `231`
- `232`
- `233`
- `234`
- `235`
- `236`
- `237`
- `238`
- `239`
- `240`
- `241`
- `242`
- `243`
- `244`
- `245`
- `246`
- `247`
- `248`
- `249`
- `300`
- `301`
- `302`
- `303`
- `304`
- `305`
- `306`
- `307`
- `308`
- `309`
- `310`
- `311`
- `312`
- `313`
- `314`
- `400`
- `500`
- `501`
- `502`
- `503`
- `504`
- `505`
- `506`
- `507`
- `508`
- `509`
- `510`
- `511`
- `512`
- `513`
- `514`
- `515`
- `516`
- `517`
- `518`
- `519`
- `520`
- `521`
- `522`
- `523`
- `524`
- `525`
- `526`
- `527`
- `528`
- `529`
- `530`
- `531`
- `532`
- `533`
- `534`
- `535`
- `536`
- `537`
- `538`
- `539`
- `540`
- `541`
- `542`
- `543`
- `544`
- `555`
- `556`
- `557`
- `558`
- `559`
- `560`
- `561`
- `562`
- `563`
- `564`
- `565`
- `566`
- `567`
- `568`
- `569`
- `570`
- `571`
- `572`
- `573`
- `574`
- `575`
- `576`
- `577`
- `578`
- `579`
- `580`
- `581`
- `582`
- `583`
- `584`
- `585`
- `586`
- `587`
- `588`
- `589`
- `590`
- `591`
- `592`
- `593`
- `594`
- `595`
- `596`
- `601`
- `602`
- `603`
- `604`
- `605`
- `606`
- `607`
- `608`
- `609`
- `610`
- `611`
- `612`
- `613`
- `614`
- `615`
- `616`
- `617`
- `618`
- `619`
- `620`
- `621`
- `622`
- `623`
- `624`
- `625`
- `626`
- `627`
- `628`
- `629`
- `630`
- `631`
- `632`
- `633`
- `634`
- `635`
- `636`
- `637`
- `638`
- `639`
- `641`
- `642`
- `643`
- `644`
- `646`
- `647`
- `648`
- `649`
- `650`
- `651`
- `652`
- `653`
- `654`
- `655`
- `656`
- `657`
- `658`
- `659`
- `660`
- `661`
- `662`
- `663`
- `664`
- `665`
- `666`
- `667`
- `668`
- `669`
- `670`
- `671`
- `672`
- `673`
- `674`
- `675`
- `676`
- `677`
- `678`
- `679`
- `680`
- `681`
- `682`
- `683`
- `684`
- `685`
- `686`
- `687`
- `688`
- `689`
- `690`
- `691`
- `692`
- `693`
- `694`
- `695`
- `696`
- `697`
- `698`
- `699`
- `701`
- `702`
- `703`
- `704`
- `705`
- `706`
- `707`
- `750`
- `751`
- `752`
- `753`
- `754`
- `755`
- `801`
- `802`
- `803`
- `804`
- `805`
- `806`
- `807`
- `900`
- `901`
- `902`
- `903`
- `904`
- `905`
- `906`
- `907`
- `908`
- `909`
- `1000`
- `1001`
- `1002`
- `1003`
- `1004`
- `1005`
- `1006`
- `1007`
- `1008`
- `1009`
- `1010`
- `1100`
- `1204`
- `1205`
- `1218`
- `1223`
- `1224`
- `1225`
- `1226`
- `1227`
- `1229`
- `1230`
- `1231`
- `1232`
- `1233`
- `1234`
- `1235`
- `1236`
- `1237`
- `1238`
- `1239`
- `1240`
- `1241`
- `1242`
- `1300`
- `1301`
- `1302`
- `1303`
- `1304`
- `1305`
- `1306`
- `1307`
- `1308`
- `1309`
- `1310`
- `1311`
- `1312`
- `1313`
- `1314`
- `1315`
- `1316`
- `1317`
- `1318`
- `1400`
- `1401`
- `1402`
- `1403`
- `1404`
- `1405`
- `1500`
- `1501`
- `1502`
- `1600`
- `1601`
- `1602`
- `1603`
- `1604`
- `1605`
- `1606`
- `1607`
- `1608`
- `1609`
- `1610`
- `1611`
- `1612`
- `1613`
- `1614`
- `1615`
- `1616`
- `1617`
- `1618`
- `1619`
- `1620`
- `1621`
- `1622`
- `1623`
- `1624`
- `1625`
- `1626`
- `1627`
- `1628`
- `1629`
- `1630`
- `1631`
- `1632`
- `1633`
- `1634`
- `1635`
- `1636`
- `1637`
- `1638`
- `1639`
- `1640`
- `1641`
- `1642`
- `1643`
- `1644`
- `1645`
- `1646`
- `1647`
- `1648`
- `1649`
- `1650`
- `1651`
- `1652`
- `1653`
- `1654`
- `1655`
- `1656`
- `1657`
- `1658`
- `1659`
- `1660`
- `1661`
- `1662`
- `1663`
- `1664`
- `1665`
- `1666`
- `1667`
- `1668`
- `1669`
- `1670`
- `1671`
- `1672`
- `1673`
- `1674`
- `1675`
- `1676`
- `1677`
- `1678`
- `1679`
- `1680`
- `1681`
- `1682`
- `1683`
- `1684`
- `1685`
- `1686`
- `1687`
- `1688`
- `1800`
- `1801`
- `1802`
- `1803`
- `1804`
- `1805`
- `1806`
- `1900`
- `1901`
- `1902`
- `1903`
- `1904`
- `1905`
- `1906`
- `1907`
- `1908`
- `1910`
- `1911`
- `1912`
- `1913`
- `1914`
- `2000`
- `2001`
- `2002`
- `2003`
- `2004`
- `2005`
- `2006`
- `2007`
- `2008`
- `2009`
- `2010`
- `2011`
- `2012`
- `2013`
- `2014`
- `2015`
- `2016`
- `2017`
- `2018`
- `2019`
- `2020`
- `2021`
- `2022`
- `2023`
- `2024`
- `2025`
- `2026`
- `2027`
- `2028`
- `2029`
- `2030`
- `2031`
- `2032`
- `2033`
- `2034`
- `2035`
- `2036`
- `2037`
- `2038`
- `2039`
- `2040`
- `2041`
- `2042`
- `2043`
- `2044`
- `2045`
- `2046`
- `2047`
- `2048`
- `2049`
- `2050`
- `2051`
- `2052`
- `2053`
- `2054`
- `2055`
- `2056`
- `2057`
- `2058`
- `2059`
- `2060`
- `2061`
- `2062`
- `2063`
- `2064`
- `2065`
- `2100`
- `2101`
- `2102`
- `2103`
- `2104`
- `2105`
- `2106`
- `2107`
- `2108`
- `2109`
- `2110`
- `2111`
- `2112`
- `2113`
- `2114`
- `2115`
- `2116`
- `2117`
- `2118`
- `2119`
- `2120`
- `2121`
- `2122`
- `2123`
- `2124`
- `2125`
- `2126`
- `2200`
- `2201`
- `2202`
- `2203`
- `2204`
- `2205`
- `2206`
- `2207`
- `2300`
- `2500`
- `2501`
- `2502`
- `2503`
- `2504`
- `2505`
- `2506`
- `2507`
- `2508`
- `2509`
- `2510`
- `2600`
- `2601`
- `2700`
- `2701`
- `2702`
- `2703`
- `2800`
- `2801`
- `2802`
- `2803`
- `2804`
- `2805`
- `2806`
- `2900`
- `2901`
- `2902`
- `2903`
- `3000`
- `3001`
- `3002`
- `3003`
- `3004`
- `3005`
- `3006`
- `3007`
- `3008`
- `3009`
- `3010`
- `3011`
- `3012`
- `3013`
- `3014`
- `3015`
- `3016`
- `3017`
- `3018`
- `3019`
- `3020`
- `3021`
- `3022`
- `3023`
- `3024`
- `3025`
- `3026`
- `3027`
- `3028`
- `3029`
- `3030`
- `3031`
- `3032`
- `3033`
- `3034`
- `3035`
- `3036`
- `3037`
- `3038`
- `3100`
- `3101`
- `3102`
- `3103`
- `3104`
- `3105`
- `3106`
- `3107`
- `3108`
- `3109`
- `3110`
- `3111`
- `3112`
- `3113`
- `3114`
- `3115`
- `3116`
- `3117`
- `3118`
- `3119`
- `3120`
- `3121`
- `3122`
- `3123`
- `3124`
- `3125`
- `3126`
- `3127`
- `3128`
- `3129`
- `3130`
- `3131`
- `3132`
- `3133`
- `3134`
- `3135`
- `3150`
- `3151`
- `3152`
- `3153`
- `3154`
- `3155`
- `3156`
- `3157`
- `3158`
- `3159`
- `3200`
- `3201`
- `3202`
- `3203`
- `3204`
- `3206`
- `3207`
- `3208`
- `3209`
- `3210`
- `3211`
- `3212`
- `3213`
- `3214`
- `3215`
- `3216`
- `3217`
- `3218`
- `3219`
- `3220`
- `3221`
- `3222`
- `3300`
- `3400`
- `3401`
- `3402`
- `3403`
- `3404`
- `3405`
- `3406`
- `3407`
- `3408`
- `3409`
- `3410`
- `3411`
- `3412`
- `3413`
- `3414`
- `3500`
- `3600`
- `3702`
- `3703`
- `3705`
- `3706`
- `3707`
- `3708`
- `3709`
- `3710`
- `3711`
- `3800`
- `3801`
- `3802`
- `3803`
- `3804`
- `3805`
- `3806`
- `3807`
- `3900`
- `3901`
- `3902`
- `3903`
- `3904`
- `3905`
- `3906`
- `3907`
- `3908`
- `3910`
- `3911`
- `3912`
- `3913`
- `4000`
- `4001`
- `4002`
- `4003`
- `4004`
- `4005`
- `4006`
- `4007`
- `4008`
- `4009`
- `5000`
- `5001`
- `5002`
- `5003`
- `5004`
- `5005`
- `5006`
- `5007`

### Fireteam.FireteamDateRange

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Fireteam.FireteamMember

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `destinyUserInfo` | `Fireteam.FireteamUserInfoCard` | no |  |
| `bungieNetUserInfo` | `User.UserInfoCard` | no |  |
| `characterId` | `integer(int64)` | no |  |
| `dateJoined` | `string(date-time)` | no |  |
| `hasMicrophone` | `boolean` | no |  |
| `lastPlatformInviteAttemptDate` | `string(date-time)` | no |  |
| `lastPlatformInviteAttemptResult` | `integer(byte)` | no |  |

### Fireteam.FireteamPlatform

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`

### Fireteam.FireteamPlatformInviteResult

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Fireteam.FireteamPublicSearchOption

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Fireteam.FireteamResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `Summary` | `Fireteam.FireteamSummary` | no |  |
| `Members` | `Fireteam.FireteamMember[]` | no |  |
| `Alternates` | `Fireteam.FireteamMember[]` | no |  |

### Fireteam.FireteamSlotSearch

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Fireteam.FireteamSummary

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `fireteamId` | `integer(int64)` | no |  |
| `groupId` | `integer(int64)` | no |  |
| `platform` | `integer(byte)` | no |  |
| `activityType` | `integer(int32)` | no |  |
| `isImmediate` | `boolean` | no |  |
| `scheduledTime` | `string(date-time)` | no |  |
| `ownerMembershipId` | `integer(int64)` | no |  |
| `playerSlotCount` | `integer(int32)` | no |  |
| `alternateSlotCount` | `integer(int32)` | no |  |
| `availablePlayerSlotCount` | `integer(int32)` | no |  |
| `availableAlternateSlotCount` | `integer(int32)` | no |  |
| `title` | `string` | no |  |
| `dateCreated` | `string(date-time)` | no |  |
| `dateModified` | `string(date-time)` | no |  |
| `isPublic` | `boolean` | no |  |
| `locale` | `string` | no |  |
| `isValid` | `boolean` | no |  |
| `datePlayerModified` | `string(date-time)` | no |  |
| `titleBeforeModeration` | `string` | no |  |
| `ownerCurrentGuardianRankSnapshot` | `integer(int32)` | no |  |
| `ownerHighestLifetimeGuardianRankSnapshot` | `integer(int32)` | no |  |
| `ownerTotalCommendationScoreSnapshot` | `integer(int32)` | no |  |

### Fireteam.FireteamUserInfoCard

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `FireteamDisplayName` | `string` | no |  |
| `FireteamMembershipType` | `integer(int32)` | no |  |
| `supplementalDisplayName` | `string` | no | A platform specific additional display name - ex: psn Real Name, bnet Unique Name, etc. |
| `iconPath` | `string` | no | URL the Icon if available. |
| `crossSaveOverride` | `integer(int32)` | no | If there is a cross save override in effect, this value will tell you the type that is overridding this one. |
| `applicableMembershipTypes` | `integer(int32)[]` | no | The list of Membership Types indicating the platforms on which this Membership can be used.<br> Not in Cross Save = its original membership type. Cross Save Primary = Any membership types it is overridding, and its original membership type Cross Save Overridden = Empty list |
| `isPublic` | `boolean` | no | If True, this is a public user membership. |
| `membershipType` | `integer(int32)` | no | Type of the membership. Not necessarily the native type. |
| `membershipId` | `integer(int64)` | no | Membership ID as they user is known in the Accounts service |
| `displayName` | `string` | no | Display Name the player has chosen for themselves. The display name is optional when the data type is used as input to a platform API. |
| `bungieGlobalDisplayName` | `string` | no | The bungie global display name, if set. |
| `bungieGlobalDisplayNameCode` | `integer(int16)` | no | The bungie global display name code, if set. |

### Forum.CommunityContentSortMode

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Forum.ForumMediaType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Forum.ForumPostPopularity

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`

### Forum.ForumPostSortEnum

Type: `integer enum`

Enum values:

- `0`
- `1`

### Forum.ForumRecruitmentDetail

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `topicId` | `integer(int64)` | no |  |
| `microphoneRequired` | `boolean` | no |  |
| `intensity` | `integer(byte)` | no |  |
| `tone` | `integer(byte)` | no |  |
| `approved` | `boolean` | no |  |
| `conversationId` | `integer(int64)` | no |  |
| `playerSlotsTotal` | `integer(int32)` | no |  |
| `playerSlotsRemaining` | `integer(int32)` | no |  |
| `Fireteam` | `User.GeneralUser[]` | no |  |
| `kickedPlayerIds` | `integer(int64)[]` | no |  |

### Forum.ForumRecruitmentIntensityLabel

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Forum.ForumRecruitmentToneLabel

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Forum.ForumTopicsCategoryFiltersEnum

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`
- `128`

### Forum.ForumTopicsQuickDateEnum

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Forum.ForumTopicsSortEnum

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`

### Forum.PollResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `topicId` | `integer(int64)` | no |  |
| `results` | `Forum.PollResult[]` | no |  |
| `totalVotes` | `integer(int32)` | no |  |

### Forum.PollResult

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `answerText` | `string` | no |  |
| `answerSlot` | `integer(int32)` | no |  |
| `lastVoteDate` | `string(date-time)` | no |  |
| `votes` | `integer(int32)` | no |  |
| `requestingUserVoted` | `boolean` | no |  |

### Forum.PostResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `lastReplyTimestamp` | `string(date-time)` | no |  |
| `IsPinned` | `boolean` | no |  |
| `urlMediaType` | `integer(int32)` | no |  |
| `thumbnail` | `string` | no |  |
| `popularity` | `integer(int32)` | no |  |
| `isActive` | `boolean` | no |  |
| `isAnnouncement` | `boolean` | no |  |
| `userRating` | `integer(int32)` | no |  |
| `userHasRated` | `boolean` | no |  |
| `userHasMutedPost` | `boolean` | no |  |
| `latestReplyPostId` | `integer(int64)` | no |  |
| `latestReplyAuthorId` | `integer(int64)` | no |  |
| `ignoreStatus` | `Ignores.IgnoreResponse` | no |  |
| `locale` | `string` | no |  |

### Forum.PostSearchResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `relatedPosts` | `Forum.PostResponse[]` | no |  |
| `authors` | `User.GeneralUser[]` | no |  |
| `groups` | `GroupsV2.GroupResponse[]` | no |  |
| `searchedTags` | `Tags.Models.Contracts.TagResponse[]` | no |  |
| `polls` | `Forum.PollResponse[]` | no |  |
| `recruitmentDetails` | `Forum.ForumRecruitmentDetail[]` | no |  |
| `availablePages` | `integer(int32)` | no |  |
| `results` | `Forum.PostResponse[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### Forums.ForumFlagsEnum

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`
- `128`

### Forums.ForumPostCategoryEnums

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`
- `128`
- `256`
- `512`
- `1024`

### GlobalAlert

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `AlertKey` | `string` | no |  |
| `AlertHtml` | `string` | no |  |
| `AlertTimestamp` | `string(date-time)` | no |  |
| `AlertLink` | `string` | no |  |
| `AlertLevel` | `integer(int32)` | no |  |
| `AlertType` | `integer(int32)` | no |  |
| `StreamInfo` | `StreamInfo` | no |  |

### GlobalAlertLevel

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### GlobalAlertType

Type: `integer enum`

Enum values:

- `0`
- `1`

### GroupsV2.Capabilities

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`

### GroupsV2.ChatSecuritySetting

Type: `integer enum`

Enum values:

- `0`
- `1`

### GroupsV2.ClanBanner

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `decalId` | `integer(uint32)` | no |  |
| `decalColorId` | `integer(uint32)` | no |  |
| `decalBackgroundColorId` | `integer(uint32)` | no |  |
| `gonfalonId` | `integer(uint32)` | no |  |
| `gonfalonColorId` | `integer(uint32)` | no |  |
| `gonfalonDetailId` | `integer(uint32)` | no |  |
| `gonfalonDetailColorId` | `integer(uint32)` | no |  |

### GroupsV2.GetGroupsForMemberResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `areAllMembershipsInactive` | `object` | no | A convenience property that indicates if every membership this user has that is a part of this group are part of an account that is considered inactive - for example, overridden accounts in Cross Save.<br> The key is the Group ID for the group being checked, and the value is true if the users' memberships for that group are all inactive. |
| `results` | `GroupsV2.GroupMembership[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### GroupsV2.GroupAllianceStatus

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### GroupsV2.GroupApplicationListRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `memberships` | `User.UserMembership[]` | no |  |
| `message` | `string` | no |  |

### GroupsV2.GroupApplicationRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | no |  |

### GroupsV2.GroupApplicationResolveState

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### GroupsV2.GroupApplicationResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `resolution` | `integer(int32)` | no |  |

### GroupsV2.GroupBan

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `groupId` | `integer(int64)` | no |  |
| `lastModifiedBy` | `User.UserInfoCard` | no |  |
| `createdBy` | `User.UserInfoCard` | no |  |
| `dateBanned` | `string(date-time)` | no |  |
| `dateExpires` | `string(date-time)` | no |  |
| `comment` | `string` | no |  |
| `bungieNetUserInfo` | `User.UserInfoCard` | no |  |
| `destinyUserInfo` | `GroupsV2.GroupUserInfoCard` | no |  |

### GroupsV2.GroupBanRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `string` | no |  |
| `length` | `integer(int32)` | no |  |

### GroupsV2.GroupDateRange

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### GroupsV2.GroupEditAction

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `about` | `string` | no |  |
| `motto` | `string` | no |  |
| `theme` | `string` | no |  |
| `avatarImageIndex` | `integer(int32)` | no |  |
| `tags` | `string` | no |  |
| `isPublic` | `boolean` | no |  |
| `membershipOption` | `integer(int32)` | no |  |
| `isPublicTopicAdminOnly` | `boolean` | no |  |
| `allowChat` | `boolean` | no |  |
| `chatSecurity` | `integer(int32)` | no |  |
| `callsign` | `string` | no |  |
| `locale` | `string` | no |  |
| `homepage` | `integer(int32)` | no |  |
| `enableInvitationMessagingForAdmins` | `boolean` | no |  |
| `defaultPublicity` | `integer(int32)` | no |  |

### GroupsV2.GroupEditHistory

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `groupId` | `integer(int64)` | no |  |
| `name` | `string` | no |  |
| `nameEditors` | `integer(int64)` | no |  |
| `about` | `string` | no |  |
| `aboutEditors` | `integer(int64)` | no |  |
| `motto` | `string` | no |  |
| `mottoEditors` | `integer(int64)` | no |  |
| `clanCallsign` | `string` | no |  |
| `clanCallsignEditors` | `integer(int64)` | no |  |
| `editDate` | `string(date-time)` | no |  |
| `groupEditors` | `User.UserInfoCard[]` | no |  |

### GroupsV2.GroupFeatures

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `maximumMembers` | `integer(int32)` | no |  |
| `maximumMembershipsOfGroupType` | `integer(int32)` | no | Maximum number of groups of this type a typical membership may join. For example, a user may join about 50 General groups with their Bungie.net account. They may join one clan per Destiny membership. |
| `capabilities` | `integer(int32)` | no |  |
| `membershipTypes` | `integer(int32)[]` | no |  |
| `invitePermissionOverride` | `boolean` | no | Minimum Member Level allowed to invite new members to group<br>Always Allowed: Founder, Acting Founder<br>True means admins have this power, false means they don't<br>Default is false for clans, true for groups. |
| `updateCulturePermissionOverride` | `boolean` | no | Minimum Member Level allowed to update group culture<br>Always Allowed: Founder, Acting Founder<br>True means admins have this power, false means they don't<br>Default is false for clans, true for groups. |
| `hostGuidedGamePermissionOverride` | `integer(int32)` | no | Minimum Member Level allowed to host guided games<br>Always Allowed: Founder, Acting Founder, Admin<br>Allowed Overrides: None, Member, Beginner<br>Default is Member for clans, None for groups, although this means nothing for groups. |
| `updateBannerPermissionOverride` | `boolean` | no | Minimum Member Level allowed to update banner<br>Always Allowed: Founder, Acting Founder<br>True means admins have this power, false means they don't<br>Default is false for clans, true for groups. |
| `joinLevel` | `integer(int32)` | no | Level to join a member at when accepting an invite, application, or joining an open clan<br>Default is Beginner. |

### GroupsV2.GroupHomepage

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### GroupsV2.GroupMember

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `memberType` | `integer(int32)` | no |  |
| `isOnline` | `boolean` | no |  |
| `lastOnlineStatusChange` | `integer(int64)` | no |  |
| `groupId` | `integer(int64)` | no |  |
| `destinyUserInfo` | `GroupsV2.GroupUserInfoCard` | no |  |
| `bungieNetUserInfo` | `User.UserInfoCard` | no |  |
| `joinDate` | `string(date-time)` | no |  |

### GroupsV2.GroupMemberApplication

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `groupId` | `integer(int64)` | no |  |
| `creationDate` | `string(date-time)` | no |  |
| `resolveState` | `integer(int32)` | no |  |
| `resolveDate` | `string(date-time)` | no |  |
| `resolvedByMembershipId` | `integer(int64)` | no |  |
| `requestMessage` | `string` | no |  |
| `resolveMessage` | `string` | no |  |
| `destinyUserInfo` | `GroupsV2.GroupUserInfoCard` | no |  |
| `bungieNetUserInfo` | `User.UserInfoCard` | no |  |

### GroupsV2.GroupMemberCountFilter

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### GroupsV2.GroupMemberLeaveResult

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `group` | `GroupsV2.GroupV2` | no |  |
| `groupDeleted` | `boolean` | no |  |

### GroupsV2.GroupMembership

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `member` | `GroupsV2.GroupMember` | no |  |
| `group` | `GroupsV2.GroupV2` | no |  |

### GroupsV2.GroupMembershipBase

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `group` | `GroupsV2.GroupV2` | no |  |

### GroupsV2.GroupMembershipSearchResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `GroupsV2.GroupMembership[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### GroupsV2.GroupNameSearchRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `groupName` | `string` | no |  |
| `groupType` | `integer(int32)` | no |  |

### GroupsV2.GroupOptionalConversation

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `groupId` | `integer(int64)` | no |  |
| `conversationId` | `integer(int64)` | no |  |
| `chatEnabled` | `boolean` | no |  |
| `chatName` | `string` | no |  |
| `chatSecurity` | `integer(int32)` | no |  |

### GroupsV2.GroupOptionalConversationAddRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `chatName` | `string` | no |  |
| `chatSecurity` | `integer(int32)` | no |  |

### GroupsV2.GroupOptionalConversationEditRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `chatEnabled` | `boolean` | no |  |
| `chatName` | `string` | no |  |
| `chatSecurity` | `integer(int32)` | no |  |

### GroupsV2.GroupOptionsEditAction

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `InvitePermissionOverride` | `boolean` | no | Minimum Member Level allowed to invite new members to group<br>Always Allowed: Founder, Acting Founder<br>True means admins have this power, false means they don't<br>Default is false for clans, true for groups. |
| `UpdateCulturePermissionOverride` | `boolean` | no | Minimum Member Level allowed to update group culture<br>Always Allowed: Founder, Acting Founder<br>True means admins have this power, false means they don't<br>Default is false for clans, true for groups. |
| `HostGuidedGamePermissionOverride` | `integer(int32)` | no | Minimum Member Level allowed to host guided games<br>Always Allowed: Founder, Acting Founder, Admin<br>Allowed Overrides: None, Member, Beginner<br>Default is Member for clans, None for groups, although this means nothing for groups. |
| `UpdateBannerPermissionOverride` | `boolean` | no | Minimum Member Level allowed to update banner<br>Always Allowed: Founder, Acting Founder<br>True means admins have this power, false means they don't<br>Default is false for clans, true for groups. |
| `JoinLevel` | `integer(int32)` | no | Level to join a member at when accepting an invite, application, or joining an open clan<br>Default is Beginner. |

### GroupsV2.GroupPostPublicity

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### GroupsV2.GroupPotentialMember

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `potentialStatus` | `integer(int32)` | no |  |
| `groupId` | `integer(int64)` | no |  |
| `destinyUserInfo` | `GroupsV2.GroupUserInfoCard` | no |  |
| `bungieNetUserInfo` | `User.UserInfoCard` | no |  |
| `joinDate` | `string(date-time)` | no |  |

### GroupsV2.GroupPotentialMembership

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `member` | `GroupsV2.GroupPotentialMember` | no |  |
| `group` | `GroupsV2.GroupV2` | no |  |

### GroupsV2.GroupPotentialMembershipSearchResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `GroupsV2.GroupPotentialMembership[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### GroupsV2.GroupPotentialMemberStatus

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### GroupsV2.GroupQuery

NOTE: GroupQuery, as of Destiny 2, has essentially two totally different and incompatible "modes".
If you are querying for a group, you can pass any of the properties below.
If you are querying for a Clan, you MUST NOT pass any of the following properties (they must be null or undefined in your request, not just empty string/default values):
- groupMemberCountFilter - localeFilter - tagText
If you pass these, you will get a useless InvalidParameters error.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no |  |
| `groupType` | `integer(int32)` | no |  |
| `creationDate` | `integer(int32)` | no |  |
| `sortBy` | `integer(int32)` | no |  |
| `groupMemberCountFilter` | `integer(int32)` | no |  |
| `localeFilter` | `string` | no |  |
| `tagText` | `string` | no |  |
| `itemsPerPage` | `integer(int32)` | no |  |
| `currentPage` | `integer(int32)` | no |  |
| `requestContinuationToken` | `string` | no |  |

### GroupsV2.GroupResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | `GroupsV2.GroupV2` | no |  |
| `founder` | `GroupsV2.GroupMember` | no |  |
| `alliedIds` | `integer(int64)[]` | no |  |
| `parentGroup` | `GroupsV2.GroupV2` | no |  |
| `allianceStatus` | `integer(int32)` | no |  |
| `groupJoinInviteCount` | `integer(int32)` | no |  |
| `currentUserMembershipsInactiveForDestiny` | `boolean` | no | A convenience property that indicates if every membership you (the current user) have that is a part of this group are part of an account that is considered inactive - for example, overridden accounts in Cross Save. |
| `currentUserMemberMap` | `object` | no | This property will be populated if the authenticated user is a member of the group. Note that because of account linking, a user can sometimes be part of a clan more than once. As such, this returns the highest member type available. |
| `currentUserPotentialMemberMap` | `object` | no | This property will be populated if the authenticated user is an applicant or has an outstanding invitation to join. Note that because of account linking, a user can sometimes be part of a clan more than once. |

### GroupsV2.GroupSearchResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `GroupsV2.GroupV2Card[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### GroupsV2.GroupsForMemberFilter

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### GroupsV2.GroupSortBy

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### GroupsV2.GroupType

Type: `integer enum`

Enum values:

- `0`
- `1`

### GroupsV2.GroupUserBase

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `groupId` | `integer(int64)` | no |  |
| `destinyUserInfo` | `GroupsV2.GroupUserInfoCard` | no |  |
| `bungieNetUserInfo` | `User.UserInfoCard` | no |  |
| `joinDate` | `string(date-time)` | no |  |

### GroupsV2.GroupUserInfoCard

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `LastSeenDisplayName` | `string` | no | This will be the display name the clan server last saw the user as. If the account is an active cross save override, this will be the display name to use. Otherwise, this will match the displayName property. |
| `LastSeenDisplayNameType` | `integer(int32)` | no | The platform of the LastSeenDisplayName |
| `supplementalDisplayName` | `string` | no | A platform specific additional display name - ex: psn Real Name, bnet Unique Name, etc. |
| `iconPath` | `string` | no | URL the Icon if available. |
| `crossSaveOverride` | `integer(int32)` | no | If there is a cross save override in effect, this value will tell you the type that is overridding this one. |
| `applicableMembershipTypes` | `integer(int32)[]` | no | The list of Membership Types indicating the platforms on which this Membership can be used.<br> Not in Cross Save = its original membership type. Cross Save Primary = Any membership types it is overridding, and its original membership type Cross Save Overridden = Empty list |
| `isPublic` | `boolean` | no | If True, this is a public user membership. |
| `membershipType` | `integer(int32)` | no | Type of the membership. Not necessarily the native type. |
| `membershipId` | `integer(int64)` | no | Membership ID as they user is known in the Accounts service |
| `displayName` | `string` | no | Display Name the player has chosen for themselves. The display name is optional when the data type is used as input to a platform API. |
| `bungieGlobalDisplayName` | `string` | no | The bungie global display name, if set. |
| `bungieGlobalDisplayNameCode` | `integer(int16)` | no | The bungie global display name code, if set. |

### GroupsV2.GroupV2

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `groupId` | `integer(int64)` | no |  |
| `name` | `string` | no |  |
| `groupType` | `integer(int32)` | no |  |
| `membershipIdCreated` | `integer(int64)` | no |  |
| `creationDate` | `string(date-time)` | no |  |
| `modificationDate` | `string(date-time)` | no |  |
| `about` | `string` | no |  |
| `tags` | `string[]` | no |  |
| `memberCount` | `integer(int32)` | no |  |
| `isPublic` | `boolean` | no |  |
| `isPublicTopicAdminOnly` | `boolean` | no |  |
| `motto` | `string` | no |  |
| `allowChat` | `boolean` | no |  |
| `isDefaultPostPublic` | `boolean` | no |  |
| `chatSecurity` | `integer(int32)` | no |  |
| `locale` | `string` | no |  |
| `avatarImageIndex` | `integer(int32)` | no |  |
| `homepage` | `integer(int32)` | no |  |
| `membershipOption` | `integer(int32)` | no |  |
| `defaultPublicity` | `integer(int32)` | no |  |
| `theme` | `string` | no |  |
| `bannerPath` | `string` | no |  |
| `avatarPath` | `string` | no |  |
| `conversationId` | `integer(int64)` | no |  |
| `enableInvitationMessagingForAdmins` | `boolean` | no |  |
| `banExpireDate` | `string(date-time)` | no |  |
| `features` | `GroupsV2.GroupFeatures` | no |  |
| `remoteGroupId` | `integer(int64)` | no |  |
| `clanInfo` | `GroupsV2.GroupV2ClanInfoAndInvestment` | no |  |

### GroupsV2.GroupV2Card

A small infocard of group information, usually used for when a list of groups are returned

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `groupId` | `integer(int64)` | no |  |
| `name` | `string` | no |  |
| `groupType` | `integer(int32)` | no |  |
| `creationDate` | `string(date-time)` | no |  |
| `about` | `string` | no |  |
| `motto` | `string` | no |  |
| `memberCount` | `integer(int32)` | no |  |
| `locale` | `string` | no |  |
| `membershipOption` | `integer(int32)` | no |  |
| `capabilities` | `integer(int32)` | no |  |
| `remoteGroupId` | `integer(int64)` | no |  |
| `clanInfo` | `GroupsV2.GroupV2ClanInfo` | no |  |
| `avatarPath` | `string` | no |  |
| `theme` | `string` | no |  |

### GroupsV2.GroupV2ClanInfo

This contract contains clan-specific group information. It does not include any investment data.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `clanCallsign` | `string` | no |  |
| `clanBannerData` | `GroupsV2.ClanBanner` | no |  |

### GroupsV2.GroupV2ClanInfoAndInvestment

The same as GroupV2ClanInfo, but includes any investment data.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `d2ClanProgressions` | `object` | no |  |
| `clanCallsign` | `string` | no |  |
| `clanBannerData` | `GroupsV2.ClanBanner` | no |  |

### GroupsV2.HostGuidedGamesPermissionLevel

Used for setting the guided game permission level override (admins and founders can always host guided games).

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### GroupsV2.MembershipOption

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### GroupsV2.RuntimeGroupMemberType

The member levels used by all V2 Groups API. Individual group types use their own mappings in their native storage (general uses BnetDbGroupMemberType and D2 clans use ClanMemberLevel), but they are all translated to this in the runtime api. These runtime values should NEVER be stored anywhere, so the values can be changed as necessary.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`

### Ignores.IgnoreLength

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`

### Ignores.IgnoreResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `isIgnored` | `boolean` | no |  |
| `ignoreFlags` | `integer(int32)` | no |  |

### Ignores.IgnoreStatus

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`

### Interpolation.InterpolationPoint

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | `integer(int32)` | no |  |
| `weight` | `integer(int32)` | no |  |

### Interpolation.InterpolationPointFloat

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | `number(float)` | no |  |
| `weight` | `number(float)` | no |  |

### Links.HyperlinkReference

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | no |  |
| `url` | `string` | no |  |

### Queries.PagedQuery

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemsPerPage` | `integer(int32)` | no |  |
| `currentPage` | `integer(int32)` | no |  |
| `requestContinuationToken` | `string` | no |  |

### Queries.SearchResult

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfContentItemPublicContract

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `Content.ContentItemPublicContract[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfDestinyEntitySearchResultItem

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `Destiny.Definitions.DestinyEntitySearchResultItem[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfFireteamResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `Fireteam.FireteamResponse[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfFireteamSummary

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `Fireteam.FireteamSummary[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfGroupBan

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `GroupsV2.GroupBan[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfGroupEditHistory

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `GroupsV2.GroupEditHistory[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfGroupMember

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `GroupsV2.GroupMember[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfGroupMemberApplication

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `GroupsV2.GroupMemberApplication[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfGroupMembership

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `GroupsV2.GroupMembership[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfGroupPotentialMembership

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `GroupsV2.GroupPotentialMembership[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfGroupV2Card

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `GroupsV2.GroupV2Card[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfPostResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `Forum.PostResponse[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SearchResultOfTrendingEntry

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `results` | `Trending.TrendingEntry[]` | no |  |
| `totalResults` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `query` | `Queries.PagedQuery` | no |  |
| `replacementContinuationToken` | `string` | no |  |
| `useTotalResults` | `boolean` | no | If useTotalResults is true, then totalResults represents an accurate count.<br>If False, it does not, and may be estimated/only the size of the current page.<br>Either way, you should probably always only trust hasMore.<br>This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one. |

### SingleComponentResponseOfDestinyCharacterActivitiesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Characters.DestinyCharacterActivitiesComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyCharacterComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Characters.DestinyCharacterComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyCharacterProgressionComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Characters.DestinyCharacterProgressionComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyCharacterRecordsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Records.DestinyCharacterRecordsComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyCharacterRenderComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Characters.DestinyCharacterRenderComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyCollectiblesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Collectibles.DestinyCollectiblesComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyCurrenciesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Inventory.DestinyCurrenciesComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyInventoryComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Inventory.DestinyInventoryComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyItemComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Items.DestinyItemComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyItemInstanceComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Items.DestinyItemInstanceComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyItemObjectivesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Items.DestinyItemObjectivesComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyItemPerksComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Items.DestinyItemPerksComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyItemPlugObjectivesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Items.DestinyItemPlugObjectivesComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyItemRenderComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Items.DestinyItemRenderComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyItemReusablePlugsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Items.DestinyItemReusablePlugsComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyItemSocketsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Items.DestinyItemSocketsComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyItemStatsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Items.DestinyItemStatsComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyItemTalentGridComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Items.DestinyItemTalentGridComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyKiosksComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Kiosks.DestinyKiosksComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyLoadoutsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Loadouts.DestinyLoadoutsComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyMetricsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Metrics.DestinyMetricsComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyPlatformSilverComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Inventory.DestinyPlatformSilverComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyPlugSetsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.PlugSets.DestinyPlugSetsComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyPresentationNodesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Presentation.DestinyPresentationNodesComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyProfileCollectiblesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Collectibles.DestinyProfileCollectiblesComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyProfileComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Profiles.DestinyProfileComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyProfileProgressionComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Profiles.DestinyProfileProgressionComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyProfileRecordsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Records.DestinyProfileRecordsComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyProfileTransitoryComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Profiles.DestinyProfileTransitoryComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinySocialCommendationsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Social.DestinySocialCommendationsComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyStringVariablesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.StringVariables.DestinyStringVariablesComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyVendorCategoriesComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Vendors.DestinyVendorCategoriesComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyVendorComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Vendors.DestinyVendorComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyVendorGroupComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Components.Vendors.DestinyVendorGroupComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### SingleComponentResponseOfDestinyVendorReceiptsComponent

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Destiny.Entities.Profiles.DestinyVendorReceiptsComponent` | no |  |
| `privacy` | `integer(int32)` | no |  |
| `disabled` | `boolean` | no | If true, this component is disabled. |

### Social.Friends.BungieFriend

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `lastSeenAsMembershipId` | `integer(int64)` | no |  |
| `lastSeenAsBungieMembershipType` | `integer(int32)` | no |  |
| `bungieGlobalDisplayName` | `string` | no |  |
| `bungieGlobalDisplayNameCode` | `integer(int16)` | no |  |
| `onlineStatus` | `integer(int32)` | no |  |
| `onlineTitle` | `integer(int32)` | no |  |
| `relationship` | `integer(int32)` | no |  |
| `bungieNetUser` | `User.GeneralUser` | no |  |

### Social.Friends.BungieFriendListResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `friends` | `Social.Friends.BungieFriend[]` | no |  |

### Social.Friends.BungieFriendRequestListResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `incomingRequests` | `Social.Friends.BungieFriend[]` | no |  |
| `outgoingRequests` | `Social.Friends.BungieFriend[]` | no |  |

### Social.Friends.FriendRelationshipState

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`

### Social.Friends.PlatformFriend

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `platformDisplayName` | `string` | no |  |
| `friendPlatform` | `integer(int32)` | no |  |
| `destinyMembershipId` | `integer(int64)` | no |  |
| `destinyMembershipType` | `integer(int32)` | no |  |
| `bungieNetMembershipId` | `integer(int64)` | no |  |
| `bungieGlobalDisplayName` | `string` | no |  |
| `bungieGlobalDisplayNameCode` | `integer(int16)` | no |  |

### Social.Friends.PlatformFriendResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemsPerPage` | `integer(int32)` | no |  |
| `currentPage` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |
| `platformFriends` | `Social.Friends.PlatformFriend[]` | no |  |

### Social.Friends.PlatformFriendType

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`

### Social.Friends.PresenceOnlineStateFlags

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Social.Friends.PresenceStatus

Type: `integer enum`

Enum values:

- `0`
- `1`

### StreamInfo

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `ChannelName` | `string` | no |  |

### Streaming.DropStateEnum

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`

### Tags.Models.Contracts.TagResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `tagText` | `string` | no |  |
| `ignoreStatus` | `Ignores.IgnoreResponse` | no |  |

### Tokens.BungieRewardDisplay

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `UserRewardAvailabilityModel` | `Tokens.UserRewardAvailabilityModel` | no |  |
| `ObjectiveDisplayProperties` | `Tokens.RewardDisplayProperties` | no |  |
| `RewardDisplayProperties` | `Tokens.RewardDisplayProperties` | no |  |

### Tokens.CollectibleDefinitions

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `CollectibleDefinition` | `Destiny.Definitions.Collectibles.DestinyCollectibleDefinition` | no |  |
| `DestinyInventoryItemDefinition` | `Destiny.Definitions.DestinyInventoryItemDefinition` | no |  |

### Tokens.PartnerOfferClaimRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `PartnerOfferId` | `string` | no |  |
| `BungieNetMembershipId` | `integer(int64)` | no |  |
| `TransactionId` | `string` | no |  |

### Tokens.PartnerOfferHistoryResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `PartnerOfferKey` | `string` | no |  |
| `MembershipId` | `integer(int64)` | no |  |
| `MembershipType` | `integer(int32)` | no |  |
| `LocalizedName` | `string` | no |  |
| `LocalizedDescription` | `string` | no |  |
| `IsConsumable` | `boolean` | no |  |
| `QuantityApplied` | `integer(int32)` | no |  |
| `ApplyDate` | `string(date-time)` | no |  |

### Tokens.PartnerOfferSkuHistoryResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `SkuIdentifier` | `string` | no |  |
| `LocalizedName` | `string` | no |  |
| `LocalizedDescription` | `string` | no |  |
| `ClaimDate` | `string(date-time)` | no |  |
| `AllOffersApplied` | `boolean` | no |  |
| `TransactionId` | `string` | no |  |
| `SkuOffers` | `Tokens.PartnerOfferHistoryResponse[]` | no |  |

### Tokens.PartnerRewardHistoryResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `PartnerOffers` | `Tokens.PartnerOfferSkuHistoryResponse[]` | no |  |
| `TwitchDrops` | `Tokens.TwitchDropHistoryResponse[]` | no |  |

### Tokens.RewardAvailabilityModel

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `HasExistingCode` | `boolean` | no |  |
| `RecordDefinitions` | `Destiny.Definitions.Records.DestinyRecordDefinition[]` | no |  |
| `CollectibleDefinitions` | `Tokens.CollectibleDefinitions[]` | no |  |
| `IsOffer` | `boolean` | no |  |
| `HasOffer` | `boolean` | no |  |
| `OfferApplied` | `boolean` | no |  |
| `DecryptedToken` | `string` | no |  |
| `IsLoyaltyReward` | `boolean` | no |  |
| `ShopifyEndDate` | `string(date-time)` | no |  |
| `GameEarnByDate` | `string(date-time)` | no |  |
| `RedemptionEndDate` | `string(date-time)` | no |  |

### Tokens.RewardDisplayProperties

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `Name` | `string` | no |  |
| `Description` | `string` | no |  |
| `ImagePath` | `string` | no |  |

### Tokens.TwitchDropHistoryResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `Title` | `string` | no |  |
| `Description` | `string` | no |  |
| `CreatedAt` | `string(date-time)` | no |  |
| `ClaimState` | `integer(byte)` | no |  |

### Tokens.UserRewardAvailabilityModel

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `AvailabilityModel` | `Tokens.RewardAvailabilityModel` | no |  |
| `IsAvailableForUser` | `boolean` | no |  |
| `IsUnlockedForUser` | `boolean` | no |  |

### Trending.TrendingCategories

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `categories` | `Trending.TrendingCategory[]` | no |  |

### Trending.TrendingCategory

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `categoryName` | `string` | no |  |
| `entries` | `SearchResultOfTrendingEntry` | no |  |
| `categoryId` | `string` | no |  |

### Trending.TrendingDetail

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `identifier` | `string` | no |  |
| `entityType` | `integer(int32)` | no |  |
| `news` | `Trending.TrendingEntryNews` | no |  |
| `support` | `Trending.TrendingEntrySupportArticle` | no |  |
| `destinyItem` | `Trending.TrendingEntryDestinyItem` | no |  |
| `destinyActivity` | `Trending.TrendingEntryDestinyActivity` | no |  |
| `destinyRitual` | `Trending.TrendingEntryDestinyRitual` | no |  |
| `creation` | `Trending.TrendingEntryCommunityCreation` | no |  |

### Trending.TrendingEntry

The list entry view for trending items. Returns just enough to show the item on the trending page.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `weight` | `number(double)` | no | The weighted score of this trending item. |
| `isFeatured` | `boolean` | no |  |
| `identifier` | `string` | no | We don't know whether the identifier will be a string, a uint, or a long... so we're going to cast it all to a string. But either way, we need any trending item created to have a single unique identifier for its type. |
| `entityType` | `integer(int32)` | no | An enum - unfortunately - dictating all of the possible kinds of trending items that you might get in your result set, in case you want to do custom rendering or call to get the details of the item. |
| `displayName` | `string` | no | The localized "display name/article title/'primary localized identifier'" of the entity. |
| `tagline` | `string` | no | If the entity has a localized tagline/subtitle/motto/whatever, that is found here. |
| `image` | `string` | no |  |
| `startDate` | `string(date-time)` | no |  |
| `endDate` | `string(date-time)` | no |  |
| `link` | `string` | no |  |
| `webmVideo` | `string` | no | If this is populated, the entry has a related WebM video to show. I am 100% certain I am going to regret putting this directly on TrendingEntry, but it will work so yolo |
| `mp4Video` | `string` | no | If this is populated, the entry has a related MP4 video to show. I am 100% certain I am going to regret putting this directly on TrendingEntry, but it will work so yolo |
| `featureImage` | `string` | no | If isFeatured, this image will be populated with whatever the featured image is. Note that this will likely be a very large image, so don't use it all the time. |
| `items` | `Trending.TrendingEntry[]` | no | If the item is of entityType TrendingEntryType.Container, it may have items - also Trending Entries - contained within it. This is the ordered list of those to display under the Container's header. |
| `creationDate` | `string(date-time)` | no | If the entry has a date at which it was created, this is that date. |

### Trending.TrendingEntryCommunityCreation

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `media` | `string` | no |  |
| `title` | `string` | no |  |
| `author` | `string` | no |  |
| `authorMembershipId` | `integer(int64)` | no |  |
| `postId` | `integer(int64)` | no |  |
| `body` | `string` | no |  |
| `upvotes` | `integer(int32)` | no |  |

### Trending.TrendingEntryDestinyActivity

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `activityHash` | `integer(uint32)` | no |  |
| `status` | `Destiny.Activities.DestinyPublicActivityStatus` | no |  |

### Trending.TrendingEntryDestinyItem

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `itemHash` | `integer(uint32)` | no |  |

### Trending.TrendingEntryDestinyRitual

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `image` | `string` | no |  |
| `icon` | `string` | no |  |
| `title` | `string` | no |  |
| `subtitle` | `string` | no |  |
| `dateStart` | `string(date-time)` | no |  |
| `dateEnd` | `string(date-time)` | no |  |
| `milestoneDetails` | `object` | no | A destiny event does not necessarily have a related Milestone, but if it does the details will be returned here. |
| `eventContent` | `object` | no | A destiny event will not necessarily have milestone "custom content", but if it does the details will be here. |

### Trending.TrendingEntryNews

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `article` | `Content.ContentItemPublicContract` | no |  |

### Trending.TrendingEntrySupportArticle

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `article` | `Content.ContentItemPublicContract` | no |  |

### Trending.TrendingEntryType

The known entity types that you can have returned from Trending.

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`

### User.CrossSaveUserMembership

Very basic info about a user as returned by the Account server, but including CrossSave information. Do NOT use as a request contract.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `crossSaveOverride` | `integer(int32)` | no | If there is a cross save override in effect, this value will tell you the type that is overridding this one. |
| `applicableMembershipTypes` | `integer(int32)[]` | no | The list of Membership Types indicating the platforms on which this Membership can be used.<br> Not in Cross Save = its original membership type. Cross Save Primary = Any membership types it is overridding, and its original membership type Cross Save Overridden = Empty list |
| `isPublic` | `boolean` | no | If True, this is a public user membership. |
| `membershipType` | `integer(int32)` | no | Type of the membership. Not necessarily the native type. |
| `membershipId` | `integer(int64)` | no | Membership ID as they user is known in the Accounts service |
| `displayName` | `string` | no | Display Name the player has chosen for themselves. The display name is optional when the data type is used as input to a platform API. |
| `bungieGlobalDisplayName` | `string` | no | The bungie global display name, if set. |
| `bungieGlobalDisplayNameCode` | `integer(int16)` | no | The bungie global display name code, if set. |

### User.EmailOptInDefinition

Defines a single opt-in category: a wide-scoped permission to send emails for the subject related to the opt-in.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no | The unique identifier for this opt-in category. |
| `value` | `integer(int64)` | no | The flag value for this opt-in category. For historical reasons, this is defined as a flags enum. |
| `setByDefault` | `boolean` | no | If true, this opt-in setting should be set by default in situations where accounts are created without explicit choices about what they're opting into. |
| `dependentSubscriptions` | `User.EmailSubscriptionDefinition[]` | no | Information about the dependent subscriptions for this opt-in. |

### User.EMailSettingLocalization

Localized text relevant to a given EMail setting in a given localization.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string` | no |  |
| `description` | `string` | no |  |

### User.EmailSettings

The set of all email subscription/opt-in settings and definitions.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `optInDefinitions` | `object` | no | Keyed by the name identifier of the opt-in definition. |
| `subscriptionDefinitions` | `object` | no | Keyed by the name identifier of the Subscription definition. |
| `views` | `object` | no | Keyed by the name identifier of the View definition. |

### User.EMailSettingSubscriptionLocalization

Localized text relevant to a given EMail setting in a given localization. Extra settings specifically for subscriptions.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `unknownUserDescription` | `string` | no |  |
| `registeredUserDescription` | `string` | no |  |
| `unregisteredUserDescription` | `string` | no |  |
| `unknownUserActionText` | `string` | no |  |
| `knownUserActionText` | `string` | no |  |
| `title` | `string` | no |  |
| `description` | `string` | no |  |

### User.EmailSubscriptionDefinition

Defines a single subscription: permission to send emails for a specific, focused subject (generally timeboxed, such as for a specific release of a product or feature).

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no | The unique identifier for this subscription. |
| `localization` | `object` | no | A dictionary of localized text for the EMail Opt-in setting, keyed by the locale. |
| `value` | `integer(int64)` | no | The bitflag value for this subscription. Should be a unique power of two value. |

### User.EmailViewDefinition

Represents a data-driven view for Email settings. Web/Mobile UI can use this data to show new EMail settings consistently without further manual work.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no | The identifier for this view. |
| `viewSettings` | `User.EmailViewDefinitionSetting[]` | no | The ordered list of settings to show in this view. |

### User.EmailViewDefinitionSetting

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | no | The identifier for this UI Setting, which can be used to relate it to custom strings or other data as desired. |
| `localization` | `object` | no | A dictionary of localized text for the EMail setting, keyed by the locale. |
| `setByDefault` | `boolean` | no | If true, this setting should be set by default if the user hasn't chosen whether it's set or cleared yet. |
| `optInAggregateValue` | `integer(int64)` | no | The OptInFlags value to set or clear if this setting is set or cleared in the UI. It is the aggregate of all underlying opt-in flags related to this setting. |
| `subscriptions` | `User.EmailSubscriptionDefinition[]` | no | The subscriptions to show as children of this setting, if any. |

### User.ExactSearchRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayName` | `string` | no |  |
| `displayNameCode` | `integer(int16)` | no |  |

### User.GeneralUser

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `membershipId` | `integer(int64)` | no |  |
| `uniqueName` | `string` | no |  |
| `normalizedName` | `string` | no |  |
| `displayName` | `string` | no |  |
| `profilePicture` | `integer(int32)` | no |  |
| `profileTheme` | `integer(int32)` | no |  |
| `userTitle` | `integer(int32)` | no |  |
| `successMessageFlags` | `integer(int64)` | no |  |
| `isDeleted` | `boolean` | no |  |
| `about` | `string` | no |  |
| `firstAccess` | `string(date-time)` | no |  |
| `lastUpdate` | `string(date-time)` | no |  |
| `legacyPortalUID` | `integer(int64)` | no |  |
| `context` | `User.UserToUserContext` | no |  |
| `psnDisplayName` | `string` | no |  |
| `xboxDisplayName` | `string` | no |  |
| `fbDisplayName` | `string` | no |  |
| `showActivity` | `boolean` | no |  |
| `locale` | `string` | no |  |
| `localeInheritDefault` | `boolean` | no |  |
| `lastBanReportId` | `integer(int64)` | no |  |
| `showGroupMessaging` | `boolean` | no |  |
| `profilePicturePath` | `string` | no |  |
| `profilePictureWidePath` | `string` | no |  |
| `profileThemeName` | `string` | no |  |
| `userTitleDisplay` | `string` | no |  |
| `statusText` | `string` | no |  |
| `statusDate` | `string(date-time)` | no |  |
| `profileBanExpire` | `string(date-time)` | no |  |
| `blizzardDisplayName` | `string` | no |  |
| `steamDisplayName` | `string` | no |  |
| `stadiaDisplayName` | `string` | no |  |
| `twitchDisplayName` | `string` | no |  |
| `cachedBungieGlobalDisplayName` | `string` | no |  |
| `cachedBungieGlobalDisplayNameCode` | `integer(int16)` | no |  |
| `egsDisplayName` | `string` | no |  |

### User.HardLinkedUserMembership

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `membershipType` | `integer(int32)` | no |  |
| `membershipId` | `integer(int64)` | no |  |
| `CrossSaveOverriddenType` | `integer(int32)` | no |  |
| `CrossSaveOverriddenMembershipId` | `integer(int64)` | no |  |

### User.Models.GetCredentialTypesForAccountResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `credentialType` | `integer(byte)` | no |  |
| `credentialDisplayName` | `string` | no |  |
| `isPublic` | `boolean` | no |  |
| `credentialAsString` | `string` | no |  |

### User.OptInFlags

Type: `integer enum`

Enum values:

- `0`
- `1`
- `2`
- `4`
- `8`
- `16`
- `32`
- `64`
- `128`
- `256`

### User.UserInfoCard

This contract supplies basic information commonly used to display a minimal amount of information about a user. Take care to not add more properties here unless the property applies in all (or at least the majority) of the situations where UserInfoCard is used. Avoid adding game specific or platform specific details here. In cases where UserInfoCard is a subset of the data needed in a contract, use UserInfoCard as a property of other contracts.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `supplementalDisplayName` | `string` | no | A platform specific additional display name - ex: psn Real Name, bnet Unique Name, etc. |
| `iconPath` | `string` | no | URL the Icon if available. |
| `crossSaveOverride` | `integer(int32)` | no | If there is a cross save override in effect, this value will tell you the type that is overridding this one. |
| `applicableMembershipTypes` | `integer(int32)[]` | no | The list of Membership Types indicating the platforms on which this Membership can be used.<br> Not in Cross Save = its original membership type. Cross Save Primary = Any membership types it is overridding, and its original membership type Cross Save Overridden = Empty list |
| `isPublic` | `boolean` | no | If True, this is a public user membership. |
| `membershipType` | `integer(int32)` | no | Type of the membership. Not necessarily the native type. |
| `membershipId` | `integer(int64)` | no | Membership ID as they user is known in the Accounts service |
| `displayName` | `string` | no | Display Name the player has chosen for themselves. The display name is optional when the data type is used as input to a platform API. |
| `bungieGlobalDisplayName` | `string` | no | The bungie global display name, if set. |
| `bungieGlobalDisplayNameCode` | `integer(int16)` | no | The bungie global display name code, if set. |

### User.UserMembership

Very basic info about a user as returned by the Account server.

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `membershipType` | `integer(int32)` | no | Type of the membership. Not necessarily the native type. |
| `membershipId` | `integer(int64)` | no | Membership ID as they user is known in the Accounts service |
| `displayName` | `string` | no | Display Name the player has chosen for themselves. The display name is optional when the data type is used as input to a platform API. |
| `bungieGlobalDisplayName` | `string` | no | The bungie global display name, if set. |
| `bungieGlobalDisplayNameCode` | `integer(int16)` | no | The bungie global display name code, if set. |

### User.UserMembershipData

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `destinyMemberships` | `GroupsV2.GroupUserInfoCard[]` | no | this allows you to see destiny memberships that are visible and linked to this account (regardless of whether or not they have characters on the world server) |
| `primaryMembershipId` | `integer(int64)` | no | If this property is populated, it will have the membership ID of the account considered to be "primary" in this user's cross save relationship.<br> If null, this user has no cross save relationship, nor primary account. |
| `marathonMembershipId` | `integer(int64)` | no | If this property is populated, it will have the membershipId for the Marathon Membership on this user's account<br> If null, this user has no Marathon (i.e. "GoliathGame") membership. |
| `bungieNetUser` | `User.GeneralUser` | no |  |

### User.UserSearchPrefixRequest

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `displayNamePrefix` | `string` | no |  |

### User.UserSearchResponse

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `searchResults` | `User.UserSearchResponseDetail[]` | no |  |
| `page` | `integer(int32)` | no |  |
| `hasMore` | `boolean` | no |  |

### User.UserSearchResponseDetail

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `bungieGlobalDisplayName` | `string` | no |  |
| `bungieGlobalDisplayNameCode` | `integer(int16)` | no |  |
| `bungieNetMembershipId` | `integer(int64)` | no |  |
| `destinyMemberships` | `User.UserInfoCard[]` | no |  |

### User.UserToUserContext

Type: `object`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `isFollowing` | `boolean` | no |  |
| `ignoreStatus` | `Ignores.IgnoreResponse` | no |  |
| `globalIgnoreEndDate` | `string(date-time)` | no |  |

