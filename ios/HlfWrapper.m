#import "HlfWrapper.h"
#import <React/RCTLog.h>

@implementation HlfWrapper

RCT_EXPORT_MODULE()
RCT_REMAP_METHOD(sampleMethod,
                 resolver: (RCTPromiseResolveBlock)resolve
                 rejecter: (RCTPromiseRejectBlock)reject)
{
  NSString *result = @sampleMethod();
  resolve(result);
}

// RCT_EXPORT_METHOD(getName)

// RCT_EXPORT_METHOD(sampleMethod:(RCTResponseSenderBlock)callback)
// {
//     // TODO: Implement some actually useful functionality
//     callback(@[[NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
// }

@end
