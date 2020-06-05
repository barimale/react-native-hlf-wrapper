#import "HlfWrapper.h"
#import <React/RCTLog.h>

@implementation HlfWrapper

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD((NSString) getName)
{
  return "HlfWrapper";
}

// RCT_EXPORT_METHOD(sampleMethod:(NSString *)stringArgument numberParameter:(nonnull NSNumber *)numberArgument callback:(RCTResponseSenderBlock)callback)
// {
//     // TODO: Implement some actually useful functionality
//     callback(@[[NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
// }

@end
