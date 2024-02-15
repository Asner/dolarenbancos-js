import {PostHog} from 'posthog-node'

const posthog = new PostHog(process.env.POSTHOG_KEY!!,
  {
    host: 'https://app.posthog.com',
    flushAt: 1,
    flushInterval: 0,
  }
)

export interface FeatureFlagStatus {
  sammy?: boolean;
}

export const getFeatureFlagStatus = async (): Promise<FeatureFlagStatus> => {
  try {
    return {
      sammy: await posthog.isFeatureEnabled('sammy_banner', 'ff'),
    }
  } catch (error) {
    return {
      sammy: false,
    }
  }
}
